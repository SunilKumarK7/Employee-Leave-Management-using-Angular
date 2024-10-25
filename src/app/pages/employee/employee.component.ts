import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  APIResponse,
  ChildDept,
  Employee,
  ParentDept,
} from '../../model/master';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employeeObj: Employee = new Employee();
  parentDeptId: string = '';
  masterSrv = inject(MasterService);
  ParentDepartmentList: ParentDept[] = [];
  childDepartmentList: ChildDept[] = [];
  employeeList: Employee[] = [];
  ngOnInit(): void {
    debugger;
    this.loadEmployee();
    this.loadParentDept();
  }

  loadParentDept() {
    this.masterSrv.getDepartment().subscribe((res: APIResponse) => {
      this.ParentDepartmentList = res.data;
    });
  }

  getAllChild() {
    this.masterSrv.getAllChildDepartment().subscribe((res: APIResponse) => {
      this.childDepartmentList = res.data;
    });
  }

  loadEmployee() {
    this.masterSrv.GetAllEmployees().subscribe((res: Employee[]) => {
      this.employeeList = res;
    });
  }

  onEdit(item: Employee) {
    this.employeeObj = item;
    this.getAllChild();
  }
  onDelete(id: number) {
    debugger;
    const isDelete = confirm('Are you sure want to Delete');
    if (isDelete) {
      this.masterSrv.deleteEmp(id).subscribe((res: any) => {
        this.loadEmployee();
      });
    }
  }

  onDeptChange() {
    this.masterSrv
      .getChildDepartmentByParentId(this.parentDeptId)
      .subscribe((res: APIResponse) => {
        this.childDepartmentList = res.data;
      });
  }

  onSaveEmployee() {
    debugger;
    this.masterSrv
      .createNewEmployee(this.employeeObj)
      .subscribe((res: Employee) => {
        alert('Employee Created Success');
        this.employeeObj = new Employee();
      });
  }

  onUpdateEmployee() {
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res: Employee) => {
      alert('Employee Updated Successfully');
      this.employeeObj = new Employee();
    });
  }
}
