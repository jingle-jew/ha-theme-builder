"""Storage for dashboard background images uploaded by administrators."""

from __future__ import annotations

import hashlib
import os
import secrets
from pathlib import Path

from homeassistant.core import HomeAssistant

from .const import BACKGROUNDS_DIRECTORY, BACKGROUNDS_URL_PATH


class BackgroundFileStore:
    """Persist content-addressed background images under Home Assistant's www directory."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self.path = Path(hass.config.path(*BACKGROUNDS_DIRECTORY))

    async def async_save(self, content: bytes, extension: str) -> str:
        """Store an image atomically and return its public /local URL."""
        return await self._hass.async_add_executor_job(self._save, content, extension)

    def _save(self, content: bytes, extension: str) -> str:
        digest = hashlib.sha256(content).hexdigest()[:24]
        filename = f"{digest}.{extension}"
        target = self.path / filename
        self.path.mkdir(parents=True, exist_ok=True)
        if not target.exists():
            temporary = self.path / f".{filename}.{secrets.token_hex(8)}.tmp"
            try:
                with temporary.open("xb") as output:
                    output.write(content)
                    output.flush()
                    os.fsync(output.fileno())
                os.replace(temporary, target)
            finally:
                temporary.unlink(missing_ok=True)
        return f"{BACKGROUNDS_URL_PATH}/{filename}"
