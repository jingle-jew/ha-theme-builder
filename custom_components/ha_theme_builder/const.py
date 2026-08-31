"""Constants for HA Theme Builder."""

from pathlib import Path

DOMAIN = "ha_theme_builder"
NAME = "HA Theme Builder"
VERSION = "0.1.0"

PANEL_URL_PATH = "ha-theme-builder"
PANEL_COMPONENT = "ha-theme-builder-panel"
PANEL_TITLE = "Theme Builder"
PANEL_ICON = "mdi:palette-swatch-variant"

STATIC_URL_PATH = "/ha_theme_builder"
FRONTEND_MODULE = "ha-theme-builder.js"
FRONTEND_DIR = Path(__file__).parent / "frontend"

THEMES_DIRECTORY = "themes"
THEMES_FILENAME = "ha_theme_builder.yaml"
