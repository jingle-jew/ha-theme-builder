"""HA Theme Builder integration."""

from __future__ import annotations

import logging

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.panel_custom import async_register_panel
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .background_store import BackgroundFileStore
from .const import (
    DOMAIN,
    FRONTEND_DIR,
    FRONTEND_MODULE,
    PANEL_COMPONENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL_PATH,
    VERSION,
)
from .theme_store import ThemeFileStore
from .websocket import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)
_STATIC_REGISTERED = "static_registered"
_PANEL_REGISTERED = "panel_registered"
_WEBSOCKET_REGISTERED = "websocket_registered"

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Allow setup to continue until the config entry is created."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Serve the frontend, register its API and add the sidebar panel."""
    data = hass.data.setdefault(DOMAIN, {})
    if not await hass.async_add_executor_job(FRONTEND_DIR.is_dir):
        _LOGGER.error("HA Theme Builder frontend is missing: %s", FRONTEND_DIR)
        return False

    data.setdefault("store", ThemeFileStore(hass))
    data.setdefault("background_store", BackgroundFileStore(hass))

    if not data.get(_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_PATH, str(FRONTEND_DIR), cache_headers=False)]
        )
        data[_STATIC_REGISTERED] = True

    if not data.get(_WEBSOCKET_REGISTERED):
        async_register_websocket_commands(hass)
        data[_WEBSOCKET_REGISTERED] = True

    if not data.get(_PANEL_REGISTERED):
        await async_register_panel(
            hass,
            frontend_url_path=PANEL_URL_PATH,
            webcomponent_name=PANEL_COMPONENT,
            sidebar_title=PANEL_TITLE,
            sidebar_icon=PANEL_ICON,
            module_url=f"{STATIC_URL_PATH}/{FRONTEND_MODULE}?v={VERSION}",
            require_admin=True,
        )
        data[_PANEL_REGISTERED] = True

    _LOGGER.info("HA Theme Builder loaded at /%s", PANEL_URL_PATH)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the sidebar panel when the config entry is unloaded."""
    data = hass.data.get(DOMAIN, {})
    if data.get(_PANEL_REGISTERED):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
        data[_PANEL_REGISTERED] = False
    return True
