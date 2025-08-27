const FACTIONS = {
    one_piece: {
        name: 'One Piece Pirates',
        emoji: '🏴‍☠️',
        description: 'Set sail on the Grand Line and search for the ultimate treasure!',
        perk: 'Devil Fruit powers and treasure hunting bonuses',
        startingAbility: 'Pirate\'s Intuition - Increased success rate on treasure quests',
        color: '#ff6b35'
    },
    naruto: {
        name: 'Naruto Shinobi',
        emoji: '🥷',
        description: 'Master the ninja arts and protect your hidden village!',
        perk: 'Chakra techniques and stealth mission bonuses',
        startingAbility: 'Shadow Clone Technique - Can attempt multiple quests simultaneously',
        color: '#ff8c00'
    },
    jujutsu_kaisen: {
        name: 'Jujutsu Sorcerers',
        emoji: '👁️',
        description: 'Exorcise cursed spirits and master forbidden techniques!',
        perk: 'Cursed techniques and domain expansion abilities',
        startingAbility: 'Curse Detection - Can sense hidden curse-related quests',
        color: '#8b5cf6'
    },
    demon_slayer: {
        name: 'Demon Slayers',
        emoji: '⚔️',
        description: 'Hunt demons and master the art of breathing techniques!',
        perk: 'Breathing styles and enhanced demon hunting abilities',
        startingAbility: 'Total Concentration Breathing - Increased combat effectiveness',
        color: '#06d6a0'
    }
};

// Faction-specific abilities that unlock at higher levels
const FACTION_ABILITIES = {
    one_piece: [
        { level: 5, ability: 'Haki Training', description: 'Unlock observation and armament haki' },
        { level: 10, ability: 'Devil Fruit Awakening', description: 'Enhanced devil fruit powers' },
        { level: 15, ability: 'Conqueror\'s Haki', description: 'Rare and powerful haki type' }
    ],
    naruto: [
        { level: 5, ability: 'Elemental Ninjutsu', description: 'Master fire, water, earth, wind, or lightning' },
        { level: 10, ability: 'Sage Mode', description: 'Harness natural chakra for enhanced abilities' },
        { level: 15, ability: 'Tailed Beast Mode', description: 'Channel the power of a tailed beast' }
    ],
    jujutsu_kaisen: [
        { level: 5, ability: 'Domain Expansion', description: 'Create your own domain with guaranteed hit' },
        { level: 10, ability: 'Reverse Cursed Technique', description: 'Use cursed energy for healing' },
        { level: 15, ability: 'Maximum Technique', description: 'Ultimate expression of your cursed technique' }
    ],
    demon_slayer: [
        { level: 5, ability: 'Breathing Mastery', description: 'Perfect your chosen breathing style' },
        { level: 10, ability: 'Demon Slayer Mark', description: 'Unlock supernatural combat abilities' },
        { level: 15, ability: 'Transparent World', description: 'See the flow of battle and predict movements' }
    ]
};

module.exports = {
    FACTIONS,
    FACTION_ABILITIES
};
