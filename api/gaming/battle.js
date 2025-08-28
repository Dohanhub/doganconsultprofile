/**
 * Battle Arena API Endpoint
 * Handles AI agent battles and competitions
 */

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get battle status
    const battleData = {
      status: 'active',
      arena: 'doganconsult-strategy-arena',
      currentBattle: {
        id: 'battle-' + Date.now(),
        participants: ['consult-professional', 'consult-technical'],
        mode: 'strategy-simulation',
        round: 1,
        maxRounds: 3
      },
      leaderboard: [
        { agent: 'consult-professional', wins: 15, losses: 5, winRate: 75 },
        { agent: 'consult-technical', wins: 12, losses: 8, winRate: 60 }
      ],
      availableModes: [
        'strategy-simulation',
        'business-chess',
        'roi-calculator',
        'architecture-potions',
        'code-golf',
        'debug-detective'
      ]
    };

    res.status(200).json(battleData);
  } else if (req.method === 'POST') {
    // Start new battle
    const { mode, participants } = req.body;
    
    const newBattle = {
      id: 'battle-' + Date.now(),
      mode: mode || 'strategy-simulation',
      participants: participants || ['consult-professional', 'consult-technical'],
      status: 'starting',
      createdAt: new Date().toISOString(),
      tenant: req.tenant?.brand || 'Dogan Consult'
    };

    res.status(201).json(newBattle);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
