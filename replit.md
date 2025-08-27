# Cross Realm Chronicles Discord Bot

## Overview

Cross Realm Chronicles is a Discord bot that provides a multiverse anime RPG experience. Players can create characters, choose from four different anime factions (One Piece Pirates, Naruto Shinobi, Jujutsu Sorcerers, and Demon Slayers), complete faction-specific quests, and progress through levels. The bot features character creation, profile management, quest systems, and faction-based gameplay mechanics with unique abilities and perks for each anime universe.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Framework
- **Discord.js v14**: Modern Discord bot framework with slash command support and interaction handling
- **Slash Command System**: Global slash commands with autocomplete, validation, and modern Discord UX
- **Command Handler**: File-based command system that dynamically loads and registers slash commands from the `/commands` directory
- **Event-Driven Architecture**: Uses Discord.js interaction events for slash command handling and bot lifecycle management

### Database Layer
- **SQLite3**: Local file-based database for character data persistence
- **Single Table Design**: Characters table stores all player data including faction-specific attributes
- **Async/Promise Pattern**: Database operations wrapped in promises for consistent async handling

### Character System
- **Faction-Based Gameplay**: Four distinct anime factions with unique abilities, perks, and quest types
- **Progressive Leveling**: Experience-based level system with faction-specific ability unlocks
- **Flexible Attributes**: Dynamic character attributes that vary by faction (Devil Fruits, Chakra Nature, Cursed Techniques, Breathing Styles)

### Quest System
- **Faction-Specific Quests**: Each faction has unique quest types that match their anime theme
- **Level Gating**: Quests locked behind level requirements to provide progression goals
- **Risk/Reward Mechanics**: Success/failure outcomes with different rewards and narrative responses

### Utility Modules
- **Embed System**: Standardized Discord embed creation with consistent styling and color schemes
- **Faction Configuration**: Centralized faction data including abilities, colors, and progression trees
- **Quest Configuration**: Structured quest data with level requirements and reward systems

## External Dependencies

### Core Dependencies
- **discord.js**: Discord API interaction and bot functionality
- **sqlite3**: Local SQLite database for data persistence

### Discord API Integration
- **Gateway Intents**: Guilds, GuildMessages, and MessageContent for bot functionality
- **Embed System**: Rich message formatting using Discord's embed system
- **Activity Status**: Bot presence and activity display

### Database Schema
- **Characters Table**: Stores user_id, name, faction, level, experience, gold, completed quests, and faction-specific attributes
- **Timestamp Tracking**: Created_at and updated_at fields for character lifecycle management

### File System Integration
- **Command Loading**: Dynamic command discovery and loading from filesystem
- **Database File**: Local SQLite file storage in `/database` directory