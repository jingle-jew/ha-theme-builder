"""Safe YAML storage for themes created by HA Theme Builder."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import yaml

from homeassistant.core import HomeAssistant

from .const import THEMES_DIRECTORY, THEMES_FILENAME


class ThemeFileStore:
    """Own and atomically update the integration's dedicated theme file."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the store under the Home Assistant config directory."""
        self._hass = hass
        self.path = Path(hass.config.path(THEMES_DIRECTORY, THEMES_FILENAME))

    async def async_list(self) -> list[str]:
        """Return stored theme names."""
        themes = await self._hass.async_add_executor_job(self._load)
        return sorted(themes, key=str.casefold)

    async def async_get(self, name: str) -> dict[str, Any] | None:
        """Return one stored theme."""
        themes = await self._hass.async_add_executor_job(self._load)
        theme = themes.get(name)
        return theme if isinstance(theme, dict) else None

    async def async_save(self, name: str, theme: dict[str, Any]) -> None:
        """Insert or replace one theme and write the complete file atomically."""
        def _save() -> None:
            themes = self._load()
            themes[name] = theme
            self._write(themes)

        await self._hass.async_add_executor_job(_save)

    async def async_delete(self, name: str) -> bool:
        """Delete one theme if it exists."""
        def _delete() -> bool:
            themes = self._load()
            if name not in themes:
                return False
            del themes[name]
            self._write(themes)
            return True

        return await self._hass.async_add_executor_job(_delete)

    def _load(self) -> dict[str, Any]:
        if not self.path.exists():
            return {}
        with self.path.open("r", encoding="utf-8") as source:
            loaded = yaml.safe_load(source) or {}
        return loaded if isinstance(loaded, dict) else {}

    def _write(self, themes: dict[str, Any]) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self.path.with_suffix(f"{self.path.suffix}.tmp")
        with temporary.open("w", encoding="utf-8", newline="\n") as target:
            yaml.safe_dump(
                themes,
                target,
                allow_unicode=True,
                default_flow_style=False,
                sort_keys=False,
                width=4096,
            )
            target.flush()
            os.fsync(target.fileno())
        os.replace(temporary, self.path)
