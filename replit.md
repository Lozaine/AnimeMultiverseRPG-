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
- **Autocomplete Integration**: Full autocomplete support for inventory item selection with real-time filtering
- **Interaction Handler**: Comprehensive interaction processing for slash commands, buttons, select menus, and modals

### Database Layer
- **SQLite3**: Local file-based database for character data persistence
- **Single Table Design**: Characters table stores all player data including faction-specific attributes
- **Async/Promise Pattern**: Database operations wrapped in promises for consistent async handling
- **Migration Ready**: Dynamic schema updates with backward compatibility for existing characters
- **Production Environment**: Stable database connection established in standard Replit environment

### Character System
- **Faction-Based Gameplay**: Four distinct anime factions with unique abilities, perks, and quest types
- **Progressive Leveling**: Experience-based level system with increasing XP requirements (Level 1 → 100 XP, Level 2 → 200 XP, Level 3 → 300 XP, etc.)
- **Combat Stats**: HP and ATK stats that increase with each level up (+10 HP, +2 ATK per level)
- **Level-Up Notifications**: Rich embed notifications showing stat gains and new totals
- **Flexible Attributes**: Dynamic character attributes that vary by faction (Devil Fruits, Chakra Nature, Cursed Techniques, Breathing Styles)

### Quest System
- **Faction-Specific Quests**: Each faction has unique quest types that match their anime theme
- **Level Gating**: Quests locked behind level requirements to provide progression goals
- **Risk/Reward Mechanics**: Success/failure outcomes with different rewards and narrative responses

### Utility Modules
- **Embed System**: Standardized Discord embed creation with consistent styling and color schemes
- **Faction Configuration**: Centralized faction data including abilities, colors, and progression trees
- **Quest Configuration**: Structured quest data with level requirements and reward systems
- **Level Progression System**: Comprehensive leveling utilities including XP calculations, stat scaling, and level-up detection
- **Item Usage System**: Advanced pattern recognition for item effects with MP, HP, XP, and Gold restoration

## External Dependencies

### Core Dependencies
- **discord.js**: Discord API interaction and bot functionality
- **sqlite3**: Local SQLite database for data persistence

### Discord API Integration
- **Gateway Intents**: Guilds, GuildMessages, and MessageContent for bot functionality
- **Embed System**: Rich message formatting using Discord's embed system
- **Activity Status**: Bot presence and activity display
- **Autocomplete API**: Real-time inventory item suggestions for enhanced user experience
- **Component Interactions**: Full support for buttons, select menus, and modal interactions

### Database Schema
- **Characters Table**: Stores user_id, name, faction, level, experience, gold, hp, max_hp, atk, completed quests, and faction-specific attributes
- **Timestamp Tracking**: Created_at and updated_at fields for character lifecycle management
- **Combat Stats**: HP (current health), max_hp (maximum health), atk (attack power) fields for battle mechanics

### File System Integration
- **Command Loading**: Dynamic command discovery and loading from filesystem
- **Database File**: Local SQLite file storage in `/database` directory
- **Level Progression Module**: `/utils/levelProgression.js` - Contains all leveling calculations and stat management

## Documentation

### Changelog
For detailed development history, see [CHANGELOG.md](./CHANGELOG.md) which tracks all changes, features, and technical decisions during development phases.

## Recent Changes

### Environment Migration & System Fixes Complete (Phase 2)
**Date**: August 28, 2025

#### Migration Success
- Successfully migrated Discord RPG bot from Replit Agent to standard Replit environment
- All existing functionality preserved during migration process
- Database integrity maintained with zero data loss
- Package dependencies properly configured for Node.js environment

#### Critical Fixes Applied
- **Autocomplete System**: Added missing autocomplete interaction handler in main application file
- **Button Interaction Error**: Fixed undefined property access error in inventory command
- **Use Command Enhancement**: Enhanced `/use` command autocomplete with improved validation and error handling
- **Interaction Security**: Maintained user-specific interaction restrictions during migration

#### Item Usage System Overhaul
- **Pattern Recognition**: Comprehensive regex patterns for case-insensitive item effect parsing
- **MP System**: Full Magic Points tracking and restoration support
- **Multiple Effect Support**: Items can now properly apply HP, MP, XP, and Gold effects simultaneously
- **Level Integration**: Complete level up handling with stat bonuses during item usage
- **Quest Compatibility**: All quest reward items now function correctly with their described effects

#### Character Reset & Code Maintenance
- **Character Reset System**: Complete `/reset` command with destructive action confirmation and database cleanup
- **Safety Measures**: User-specific authorization, detailed warning embeds, and transactional data deletion
- **Fresh Start Capability**: Players can completely reset and recreate characters from scratch
- **Code Modernization**: Updated deprecated `ephemeral: true` syntax to modern `flags: [4096]` approach

#### System Status
- ✅ Discord bot fully operational (Cross Realm Chronicles#3267)
- ✅ All slash commands registered and functional
- ✅ Autocomplete system working correctly for `/use` command
- ✅ Interactive inventory system operational
- ✅ Item usage system with proper effect parsing functional
- ✅ Character reset system with complete data deletion functional
- ✅ Combat and quest systems fully functional
- ✅ Database connection established and stable
- ✅ Code modernized with updated Discord.js v14 syntax

### Level Progression System Implementation (Phase 1: Foundation)
**Date**: August 27, 2025

#### XP Curve System
- Implemented dynamic XP requirements: Level 1 → 100 XP, Level 2 → 200 XP, Level 3 → 300 XP, etc.
- Created comprehensive level progression utilities in `/utils/levelProgression.js`
- Added functions for XP calculations, level detection, and progress tracking

#### Combat Stats System
- Added comprehensive combat stats to character database schema: HP, ATK, DEF, SPD, XP
- Base stats: Level 1 starts with 100 HP, 20 ATK, 10 DEF, 15 SPD
- Level-up bonuses: +10 HP, +2 ATK, +1 DEF, +1 SPD per level
- Automatic stat scaling based on character level
- XP field added for future alternative experience tracking

#### Enhanced Level-Up Experience
- Rich embed notifications showing all stat gains
- Detailed level-up information (HP, ATK, DEF, SPD gained with new totals)
- Updated profile command to display all combat stats and accurate XP progress
- Level progress percentage display in character profiles
- Character creation shows complete stat overview

#### Database Migration
- Added hp, max_hp, atk, def, spd, and xp columns to characters table
- Backward compatibility with existing characters (default values applied)
- Dynamic database schema updates during initialization
- Complete stat tracking system implementation

#### Button Interaction Security
- Implemented user-specific button restrictions for all quest interactions
- Button custom IDs now include original user ID for authorization
- Prevents other users from interfering with someone's quest progress
- Enhanced ephemeral error embeds for unauthorized access attempts
- Error messages are visually appealing with tips for proper usage
- Applied to both quest selection buttons and repeat quest buttons
- Only the unauthorized user sees the error message (ephemeral)