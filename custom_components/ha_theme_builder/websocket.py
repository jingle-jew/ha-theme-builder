"""WebSocket API used by the graphical Theme Builder panel."""

from __future__ import annotations

import re
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .theme_store import ThemeFileStore

_VARIABLE_NAME = re.compile(r"^[a-z][a-z0-9_-]*$")
_MAX_VARIABLES = 1200
_MAX_VALUE_LENGTH = 2000
_MAX_NAME_LENGTH = 80


def _store(hass: HomeAssistant) -> ThemeFileStore:
    return hass.data[DOMAIN]["store"]


def _normalize_name(value: Any) -> str | None:
    if not isinstance(value, str):
        return None
    name = " ".join(value.strip().split())
    if not name or len(name) > _MAX_NAME_LENGTH or any(char in name for char in "\r\n\0"):
        return None
    return name


def _normalize_variables(value: Any) -> dict[str, str] | None:
    if not isinstance(value, dict) or len(value) > _MAX_VARIABLES:
        return None
    variables: dict[str, str] = {}
    for key, raw_value in value.items():
        if not isinstance(key, str) or not _VARIABLE_NAME.fullmatch(key):
            return None
        if not isinstance(raw_value, (str, int, float, bool)):
            return None
        normalized = str(raw_value).strip()
        if not normalized or len(normalized) > _MAX_VALUE_LENGTH or "\0" in normalized:
            return None
        variables[key] = normalized
    return variables


def _normalize_theme(msg: dict[str, Any]) -> tuple[str, dict[str, Any]] | None:
    name = _normalize_name(msg.get("name"))
    values = _normalize_variables(msg.get("values"))
    raw_modes = msg.get("modes")
    if name is None or values is None or not isinstance(raw_modes, dict):
        return None
    light = _normalize_variables(raw_modes.get("light", {}))
    dark = _normalize_variables(raw_modes.get("dark", {}))
    if light is None or dark is None:
        return None

    theme: dict[str, Any] = dict(values)
    modes: dict[str, dict[str, str]] = {}
    if light:
        modes["light"] = light
    if dark:
        modes["dark"] = dark
    if modes:
        theme["modes"] = modes
    return name, theme


async def _async_reload_themes(hass: HomeAssistant) -> None:
    """Ask the frontend integration to discover the updated YAML file."""
    if hass.services.has_service("frontend", "reload_themes"):
        await hass.services.async_call("frontend", "reload_themes", blocking=True)


@websocket_api.websocket_command({vol.Required("type"): "ha_theme_builder/list"})
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_list_themes(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """List themes owned by HA Theme Builder."""
    connection.send_result(msg["id"], {"themes": await _store(hass).async_list()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "ha_theme_builder/get",
        vol.Required("name"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_get_theme(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Load one theme owned by HA Theme Builder."""
    name = _normalize_name(msg.get("name"))
    theme = await _store(hass).async_get(name) if name else None
    if theme is None:
        connection.send_error(msg["id"], "theme_not_found", "Theme not found")
        return

    raw_modes = theme.get("modes", {}) if isinstance(theme, dict) else {}
    values = {key: str(value) for key, value in theme.items() if key != "modes"}
    modes = {
        "light": {key: str(value) for key, value in raw_modes.get("light", {}).items()},
        "dark": {key: str(value) for key, value in raw_modes.get("dark", {}).items()},
    }
    connection.send_result(msg["id"], {"name": name, "values": values, "modes": modes})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "ha_theme_builder/save",
        vol.Required("name"): str,
        vol.Required("values"): dict,
        vol.Required("modes"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_save_theme(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Validate and persist a theme from the editor."""
    normalized = _normalize_theme(msg)
    if normalized is None:
        connection.send_error(msg["id"], "invalid_theme", "Invalid theme data")
        return
    name, theme = normalized
    await _store(hass).async_save(name, theme)
    await _async_reload_themes(hass)
    connection.send_result(msg["id"], {"saved": True, "name": name})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "ha_theme_builder/delete",
        vol.Required("name"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def websocket_delete_theme(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Delete a theme from the builder-owned YAML file."""
    name = _normalize_name(msg.get("name"))
    if name is None:
        connection.send_error(msg["id"], "invalid_name", "Invalid theme name")
        return
    deleted = await _store(hass).async_delete(name)
    if deleted:
        await _async_reload_themes(hass)
    connection.send_result(msg["id"], {"deleted": deleted, "name": name})


@callback
def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register all Theme Builder WebSocket commands."""
    websocket_api.async_register_command(hass, websocket_list_themes)
    websocket_api.async_register_command(hass, websocket_get_theme)
    websocket_api.async_register_command(hass, websocket_save_theme)
    websocket_api.async_register_command(hass, websocket_delete_theme)
