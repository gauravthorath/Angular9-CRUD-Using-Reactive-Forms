import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  selectedEmployee: number;
  employeeData: any = {};
  btnSubmitText: string;
  btnTextCancelOrClear: string;

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedEmployee = this.route.snapshot.params.id; // To read the selected employee id from URL
    if (this.selectedEmployee !== undefined) {  // skip this incase of new employee entry
      console.log(this.selectedEmployee);
      this.employeeService.getEmployee(this.selectedEmployee)
        .subscribe(
          res => {
            console.log(res);
            this.bindAllControls(res);
          },
          err => {
            return console.log(err);
          }
        );
      this.flipAddUpdateButtonText('Update');  // To set submit button text to "Update" in case of edit operation
      this.flipCancelOrClearButtonText('Cancel'); // To set CancelOrClear button text to "Cancel" in case of edit operation
    } else {
      this.flipAddUpdateButtonText('Add');   // To set submit button text to "Add" in case of add operation
      this.flipCancelOrClearButtonText('Clear'); // To set CancelOrClear button text to "Clear" in case of edit operation
    }
  }

  // To update Add or Update button text dynamically depends on from where user is navigating to this page
  flipAddUpdateButtonText(btnText: string) {
    this.btnSubmitText = btnText;
  }

  // To update Cancel or Clear button text dynamically depends on from where user is navigating to this page
  flipCancelOrClearButtonText(btnText: string) {
    this.btnTextCancelOrClear = btnText;
  }

  bindAllControls(res: any) {
    this.employeeData = res;
  }

  submitEmployee(operation: string) {
    if (operation === 'Add') {
      this.addEmployee();
    } else if (operation === 'Update') {
      this.updateEmployee();
    }
  }

  addEmployee() {
    console.log(`Adding Employee... ${this.employeeData}`);
    this.employeeService.addEmployee(this.employeeData)
      .subscribe(
        res => {
          return console.log(res);
        },
        err => {
          return console.log(err);
        }
      );
  }

  updateEmployee() {
    console.log(`Updating Employee... ${this.employeeData}`);
    this.employeeService.updateEmployee(this.employeeData)
      .subscribe(
        res => {
          return console.log(res);
        },
        err => {
          return console.log(err);
        });
  }

  cancelorClear(operation: string) {
    if (operation === 'Clear') {
      this.employeeData = [];
    } else if (operation === 'Cancel') {
      this.router.navigate(['employeelist']); // To navigate to employee list page
    }
  }
}
