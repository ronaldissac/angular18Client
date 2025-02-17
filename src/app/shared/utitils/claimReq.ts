export const claimsReq = {
    adminonly : (c:any) => c.role == "Admin",
    employeeonly :  (c:any) => c.role == "Employee",
    manageronly :  (c:any) => c.role == "Manager",
    adminormanger : (c:any) =>  c.role == "Admin" || c.role == "Manager"
}