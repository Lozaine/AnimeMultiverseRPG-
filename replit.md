# Cross Realm Chronicles Discord Bot

## Overview

Cross Realm Chronicles is a Discord bot offering a multiverse anime RPG experience within Discord. Players can create characters aligned with one of four anime factions (One Piece Pirates, Naruto Shinobi, Jujutsu Sorcerers, Demon Slayers), engage in faction-specific quests, and advance through a progressive leveling system. The bot integrates character creation, profile management, a comprehensive quest system, and faction-based gameplay mechanics featuring unique abilities and perks tailored to each anime universe.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Framework
- **Discord.js v14**: Utilizes a modern Discord bot framework for slash commands and interaction handling.
- **Slash Command System**: Supports global slash commands with autocomplete, validation, and contemporary Discord UX.
- **Command Handler**: Employs a file-based system for dynamic loading and registration of commands.
- **Event-Driven Architecture**: Leverages Discord.js interaction events for command processing and bot lifecycle.
- **Interaction Handler**: Comprehensive processing for slash commands, buttons, select menus, and modals.

### Database Layer
- **SQLite3**: Uses a local file-based database for character data persistence.
- **Single Table Design**: A `characters` table stores all player data, including faction-specific attributes.
- **Async/Promise Pattern**: Database operations are promise-based for consistent asynchronous handling.
- **Migration Ready**: Supports dynamic schema updates with backward compatibility.

### Character System
- **Faction-Based Gameplay**: Features four distinct anime factions, each with unique abilities, perks, and quest types.
- **Progressive Leveling**: An experience-based system with increasing XP requirements and stat gains (+10 HP, +2 ATK per level).
- **Combat Stats**: Includes HP and ATK stats that scale with level.
- **Flexible Attributes**: Dynamic character attributes vary by faction (e.g., Devil Fruits, Chakra Nature).
- **Custom Character Names**: Allows players to set custom in-game character names separate from their Discord username.

### Quest System
- **Faction-Specific Quests**: Unique quest types themed to each anime faction.
- **Level Gating**: Quests are locked by level requirements.
- **Risk/Reward Mechanics**: Outcomes include success/failure with varying rewards.
- **Quest Bonus System**: Factions receive different XP, coin, and item bonuses based on quest types.

### Utility Modules
- **Embed System**: Standardized Discord embed creation for consistent styling.
- **Configuration Modules**: Centralized configuration for faction data, quest data, and level progression.
- **Level Progression System**: Handles XP calculations, stat scaling, and level-up detection.
- **Item Usage System**: Advanced pattern recognition for item effects, supporting MP, HP, XP, and Gold restoration.

### Enemy System
- **Advanced Enemy System**: Diverse enemies with unique combat styles (Tank, Agile, Aggressive, etc.) and special abilities.
- **Dynamic Scaling**: Combat style-aware stat scaling for enemies based on archetype.
- **Weakness/Resistance System**: Enemies have specific vulnerabilities and resistances.

## External Dependencies

### Core Dependencies
- **discord.js**: For Discord API interaction and bot functionality.
- **sqlite3**: For local SQLite database persistence.

### Discord API Integration
- **Gateway Intents**: Utilizes Guilds, GuildMessages, and MessageContent.
- **Embed System**: For rich message formatting.
- **Autocomplete API**: Provides real-time suggestions for user input.
- **Component Interactions**: Full support for buttons, select menus, and modal interactions.

### Database Schema
- **Characters Table**: Stores `user_id`, `name`, `character_name`, `faction`, `level`, `experience`, `gold`, `hp`, `max_hp`, `atk`, `completed_quests`, and faction-specific attributes. Includes `created_at` and `updated_at` timestamps.

### File System Integration
- **Command Loading**: Dynamic command discovery from the filesystem.
- **Database File**: Local SQLite file stored in the `/database` directory.