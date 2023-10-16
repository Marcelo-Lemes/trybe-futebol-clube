import { ILeaderboard } from '../../Interfaces/Leaderboard';
import { IMatches } from '../../Interfaces/Matches';
import ITeam from '../../Interfaces/Team';

export default class GetLeaderboard {
  static pointsCalculator(teamOne: number, teamTwo: number) {
    if (teamOne > teamTwo) return 3;
    if (teamOne === teamTwo) return 1;
    return 0;
  }

  static winsCalculaor(teamOne: number, teamTwo: number) {
    if (teamOne > teamTwo) return 1;
    return 0;
  }

  static drawsCalculator(teamOne: number, teamTwo: number) {
    if (teamOne === teamTwo) return 1;
    return 0;
  }

  static losesCalculator(teamOne: number, teamTwo: number) {
    if (teamOne < teamTwo) return 1;
    return 0;
  }

  static createdata() {
    const data = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    };
    return data;
  }

  static home(test: ILeaderboard, match: IMatches, team: ITeam) {
    const { homeTeamGoals, awayTeamGoals, homeTeamId } = match;
    const data = test;
    if (team.id === homeTeamId) {
      data.totalPoints += this.pointsCalculator(homeTeamGoals, awayTeamGoals);
      data.totalGames += 1;
      data.totalVictories += this.winsCalculaor(homeTeamGoals, awayTeamGoals);
      data.totalDraws += this.drawsCalculator(homeTeamGoals, awayTeamGoals);
      data.totalLosses += this.losesCalculator(homeTeamGoals, awayTeamGoals);
      data.goalsFavor += homeTeamGoals;
      data.goalsOwn += awayTeamGoals;
      data.goalsBalance += (homeTeamGoals - awayTeamGoals);
    } return data;
  }

  static away(test: ILeaderboard, match: IMatches, team: ITeam) {
    const { homeTeamGoals, awayTeamGoals, awayTeamId } = match;
    const data = test;
    if (team.id === awayTeamId) {
      data.totalPoints += this.pointsCalculator(awayTeamGoals, homeTeamGoals);
      data.totalGames += 1;
      data.totalVictories += this.winsCalculaor(awayTeamGoals, homeTeamGoals);
      data.totalDraws += this.drawsCalculator(awayTeamGoals, homeTeamGoals);
      data.totalLosses += this.losesCalculator(awayTeamGoals, homeTeamGoals);
      data.goalsFavor += awayTeamGoals;
      data.goalsOwn += homeTeamGoals;
      data.goalsBalance += (awayTeamGoals - homeTeamGoals);
    } return data;
  }

  static totalHome(matches: IMatches[], teams: ITeam[]) {
    const results = [] as ILeaderboard[];
    teams.map((team) => {
      let data = this.createdata();
      data.name = team.teamName;
      matches.forEach((match) => {
        data = this.home(data, match, team);
        data.efficiency = ((data.totalPoints / (data.totalGames * 3)) * 100)
          .toFixed(2)
          .toString();
      }); return results.push(data);
    }); return results as ILeaderboard[];
  }

  static totalAway(matches: IMatches[], teams: ITeam[]) {
    const results = [] as ILeaderboard[];
    teams.map((team) => {
      let data = this.createdata();
      data.name = team.teamName;
      matches.forEach((match) => {
        data = this.away(data, match, team);
        data.efficiency = ((data.totalPoints / (data.totalGames * 3)) * 100)
          .toFixed(2)
          .toString();
      }); return results.push(data);
    }); return results as ILeaderboard[];
  }

  static total(matches: IMatches[], teams: ITeam[]) {
    const results = [] as ILeaderboard[];
    teams.map((team) => {
      let data = this.createdata();
      data.name = team.teamName;
      matches.forEach((match) => {
        if (team.id === match.homeTeamId) {
          data = this.home(data, match, team);
        }
        if (team.id === match.awayTeamId) {
          data = this.away(data, match, team);
        }
        data.efficiency = ((data.totalPoints / (data.totalGames * 3)) * 100)
          .toFixed(2)
          .toString();
      }); return results.push(data);
    }); return results as ILeaderboard[];
  }
}
