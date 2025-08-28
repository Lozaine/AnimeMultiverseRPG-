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
- **Comprehensive Wiki System**: In-game documentation system with 6 major categories covering all game mechanics, strategies, and systems.

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
- **Wiki System**: Comprehensive documentation module with detailed game guides and references.

## Recent Enhancements

### Comprehensive Wiki System Implementation (Phase 2 - Extended)
**Date**: August 28, 2025

#### Enhanced Documentation System
- **Comprehensive Wiki Framework**: Complete in-game documentation system with 6 major categories
- **Interactive Help System**: Updated `/wiki` command with category selection and detailed information
- **Category Structure**: Getting Started, Faction Guide, Combat Guide, Character Progression, Quest System, Items & Inventory, Command Reference
- **Detailed Content**: Over 25 sections covering all game mechanics, strategies, and systems
- **User-Friendly Design**: Rich embeds with proper formatting, examples, and navigation guidance
- **Separated Help System**: Updated `/help` command as beginner-friendly quick start guide, keeping `/wiki` for comprehensive documentation
- **Interactive Navigation**: Dropdown menus for category and section selection with previous/next buttons
- **Comprehensive Content**: In-depth explanations with detailed mechanics, strategies, and advanced tips
- **Smart Integration**: Full interaction handling with button and dropdown navigation support

#### Wiki Categories & Content
- **Getting Started**: Character creation, first quest, basic commands for new players
- **Faction Guide**: Complete breakdown of all 4 factions with abilities, bonuses, and equipment
- **Combat Guide**: Enemy types, combat styles, weakness/resistance system, encounter rates
- **Character Progression**: XP system, leveling, faction abilities, item usage, economy
- **Quest System**: All quest categories, faction bonuses, enemy encounters, rewards
- **Items & Inventory**: Item usage, categories, starting equipment, management
- **Command Reference**: Complete list of all commands with usage examples and tips

### Comprehensive Faction System Implementation (Phase 2)
**Date**: August 28, 2025

#### Enhanced Faction Framework
- **Detailed Faction Profiles**: Each faction includes theme, detailed descriptions, and unique mechanics
- **Stat Bonuses System**: Faction-specific stat bonuses applied at character creation (HP, ATK, DEF, SPD)
- **Quest Affinity System**: Factions have preferred quest types with bonus multipliers for rewards
- **Progressive Ability System**: 25+ unique abilities across all factions with level requirements and unlock conditions
- **Starting Equipment System**: Each faction begins with thematic weapons, armor, and consumable items

### Enhanced Enemy System Implementation (Phase 2)
**Date**: August 28, 2025

#### Advanced Enemy System
- **Expanded Enemy Pool**: 15 diverse enemies with unique combat styles and special abilities
- **Combat Style System**: Tank, Agile, Aggressive, Defensive, Evasive, Swarm, Erratic, and Hit-and-Run styles
- **Dynamic Scaling**: Combat style-aware stat scaling that adjusts HP, ATK, DEF, and SPD based on enemy archetype
- **Weakness/Resistance System**: Enemies have specific vulnerabilities and resistances
- **Quest-Specific Encounter Rates**: Enhanced encounter rates with level-based modifications

### Character Names & Discord.js Modernization (Phase 2)
**Date**: August 28, 2025

#### Character Identity System
- **Database Enhancement**: Added `character_name` field for custom character names separate from Discord usernames
- **Enhanced Create Command**: Updated `/create` command to accept optional character names
- **Profile Integration**: Character profiles display custom character names in titles and descriptions
- **Discord.js v14 Compatibility**: Updated deprecated `ready` event to `clientReady` to resolve deprecation warnings

## System Status
- ✅ Discord bot fully operational (Cross Realm Chronicles#3267)
- ✅ All slash commands registered and functional
- ✅ Comprehensive wiki system with 6 categories and 25+ detailed sections operational
- ✅ Enhanced faction system with stat bonuses, quest affinities, and 25+ progressive abilities active
- ✅ Advanced enemy system with 15+ unique enemies and special abilities functional
- ✅ Character name system with custom naming support implemented
- ✅ Combat style system with dynamic scaling operational
- ✅ Quest bonus system with faction-specific multipliers active
- ✅ Database connection stable with all schema enhancements
- ✅ Modern Discord.js v14 compatibility maintained