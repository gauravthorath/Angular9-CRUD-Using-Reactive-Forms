import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { Router } from '@angular/router';

export interface Employee {
  firstName: string;
  lastName: string;
  Address: string;
  doj: string;
  _id: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'Address', 'doj', '_id'];
  employeeList: [];

  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeList = [];
    this.employeeService.getEmployees()
      .subscribe(
        res => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          setTimeout(() => {   // This settimeout is used for proper sorting but did not work
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        },
        err => console.log(err)
      );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // This is used as sort was not working properly - need to fonfirm if its still required
  }

  deleteEmployee(id: string) {
    this.openDialog('Delete', id); // Confirmation dialog box open before deleting employee
    console.log(`Deleting...${id}`); // Loader will be used at this place to show in progress
  }

  editEmployee(id: string) {
    this.router.navigate(['addemployee', {id}]); // To navigate to add employee page with selected employee details
    console.log(`Editing...${id}`);
  }

  openDialog(Operation: string, id: string): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px',  // Width of dialog box
      data: {},
      disableClose: true  // To restrict escape key and click outside of modal popup
    });

    dialogRef.afterClosed().subscribe(result => {   // Yes or Cancel button click of modal popup
      if (Operation === 'Delete' && result === true) {        // Delete case
        this.employeeService.deleteEmployees(id)
          .subscribe(
            res => {
              console.log(res);
              this.getAllEmployees(); // To reload the grid
            },
            err => console.log(err)
          );
        console.log(`Delete result: ${result}`);              // snack bar will be used at this place
      } else {                                                // Cancel button click
        console.log(`Cancelled Operation`);
      }
    });
  }

}
