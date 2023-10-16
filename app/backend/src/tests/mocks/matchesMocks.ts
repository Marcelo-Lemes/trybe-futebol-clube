const matches = [
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    }
];

const matchesInProgress = [
    {
        id: 41,
        homeTeamId: 'São Paulo',
        homeTeamGoals: '2',
        awayTeamId: 'Internacional',
        awayTeamGoals: '0',
        inProgress: true,
    },
    {
        id: 42,
        homeTeamId: 'Ferroviária',
        homeTeamGoals: '1',
        awayTeamId: 'Avaí/Kindermann',
        awayTeamGoals: '0',
        inProgress: true,
    },
    {
        id: 43,
        homeTeamId: 'Napoli-SC',
        homeTeamGoals: '0',
        awayTeamId: 'Minas Brasília',
        awayTeamGoals: '0',
        inProgress: true,
    },
    {
        id: 44,
        homeTeamId: 'Flamengo',
        homeTeamGoals: '2',
        awayTeamId: 'São José-SP',
        awayTeamGoals: '2',
        inProgress: true,
    },
    {
        id: 45,
        homeTeamId: 'Cruzeiro',
        homeTeamGoals: '1',
        awayTeamId: 'Botafogo',
        awayTeamGoals: '1',
        inProgress: true,
    },
    {
        id: 46,
        homeTeamId: 'Corinthians',
        homeTeamGoals: '1',
        awayTeamId: 'Palmeiras',
        awayTeamGoals: '1',
        inProgress: true,
    },
    {
        id: 47,
        homeTeamId: 'Grêmio',
        homeTeamGoals: '1',
        awayTeamId: 'Santos',
        awayTeamGoals: '2',
        inProgress: true,
    },
    {
        id: 48,
        homeTeamId: 'Real Brasília',
        homeTeamGoals: '1',
        awayTeamId: 'Bahia',
        awayTeamGoals: '1',
        inProgress: true,
    },

];

const matchInProgress = {
  "id": 41,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Internacional"
  }
}

const matchFinished = {
  "id": 41,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 9,
  "awayTeamGoals": 0,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Internacional"
  }
}

const updatedMatch = {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": false,
  }

const createMatch = { 
  "homeTeamId": 9,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

export default {
  matches,
  matchesInProgress,
  matchInProgress,
  matchFinished,
  createMatch,
  updatedMatch
}