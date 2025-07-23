import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  constructor(private apiService: SharedService, private toastr: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.loginGuestUser();
  }

  standingData: any;

  loginGuestUser() {
    this.apiService.getApi1(`https://api-web.nhle.com/v1/standings/now`).subscribe({
      next: (resp: any) => {
        this.standingData = resp.standings;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }


  // Base table headers
  headers: string[] = [
    'S.No', 'Player Name', 'Position', 'Games Played', 'Goals', 'Assists',
    'Points', 'Playoff Goals', 'Playoff Assists', 'Playoff Points'
  ];

  // Dynamic custom columns
  customColumns: string[] = [];
  newColumnName: string = '';
  showInput: boolean = false;

  // Example data (from API eventually)
  tableData = [
    {
      id: 1,
      name: 'John Smith',
      position: 23,
      gamesPlayed: 5,
      goals: 20,
      assists: 15,
      points: 5,
      playoffGoals: 3,
      playoffAssists: 15,
      playoffPoints: 5,
      custom: [] // new custom columns data here
    },
    {
      id: 2,
      name: 'David Green',
      position: 19,
      gamesPlayed: 7,
      goals: 10,
      assists: 12,
      points: 4,
      playoffGoals: 2,
      playoffAssists: 11,
      playoffPoints: 3,
      custom: []
    }
  ];

  onAddColumnClick() {
    if (this.customColumns.length >= 5 || this.showInput) return;
    this.showInput = true;
  }

  saveNewColumn() {
    const name = this.newColumnName.trim();
    if (!name || this.customColumns.length >= 5) return;

    this.customColumns.push(name);
    this.tableData.forEach(row => row.custom.push());
    this.newColumnName = '';
    this.showInput = false;
  }


}
