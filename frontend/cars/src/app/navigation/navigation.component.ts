import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../car-page/modal/modal.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(
    private router: Router,
    private  dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public goToPage(url: string[]): void {
    this.router.navigate(url);
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);
  }
}
