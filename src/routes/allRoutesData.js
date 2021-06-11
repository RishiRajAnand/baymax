export const registration = { label: "Registration", link: "/registration" }
export const patientSearch = { label: "Search Patients", link: "/patientSearch" }
export const doctorAppointment = { label: "Doctor Appointment", link: "/doctorAppointment" }
export const addDoctor = { label: "Add Doctors", link: "/addDoctor" }
export const addMedicine = { label: "Add Medicines", link: "/addMedicine" }
export const addTest = { label: "Add Test", link: "/addTest" }
export const serviceCatalogue = { label: "Service Catalogue", link: "/inProgress" }
export const addNewMedicine = { label: "Add New Item", link: "/addNewMedicine" }
export const manageMedicines = { label: "Manage Inventory", link: "/manageMedicines" }
export const purchaseOrderList = { label: "Purchase Order List", link: "/purchaseOrderList" }
export const newPurchaseOrder = { label: "New Purchase Order", link: "/newPurchaseOrder" }
export const manageSuppliers = { label: "Manage Suppliers", link: "/manageSuppliers" }
export const billing = { label: "Billing", link: "/billing" };
export const billSearch = { label: "Bill Search", link: "/billSearch" };
export const appointment = { label: "Appointment", link: "/appointment" };
export const certificates = { label: "Certificates", link: "/certificates" };
export const packageManagement = { label: "Package Management", link: "/package" };
export const canteen = { label: "Canteen", link: "/canteen" };
export const pharmacy = { label: "Pharmacy", link: "/pharmacy" };
export const reimbursements = { label: "Reimbursements", link: "/inProgress" };
export const insurance = { label: "Insurance", link: "/inProgress" };
export const certificateCreation = { label: "Certificate creation", link: "/inProgress" };
export const referrals = { label: "Referrals", link: "/inProgress" };
export const reports = { label: "Reports", link: "/reports" };
export const manageItemCategories = { label: "Item Categories", link: "/manageItemCategories" };
export const manageItemUnits = { label: "Item Units", link: "/manageItemUnits" };
export const manageLists = {
    label: "Manage Lists",
    hasChildRoutes: true,
    childRoutes: [manageItemCategories, manageItemUnits]
}
export const doctorRoutes = [doctorAppointment];
export const pharmacyRoutes = [addNewMedicine, manageMedicines, purchaseOrderList, newPurchaseOrder, manageSuppliers, billing, billSearch];
export const inventoryRoutes = [addNewMedicine, manageMedicines, purchaseOrderList, newPurchaseOrder, manageSuppliers, billing, billSearch, reports, manageLists];
export const receptionRoutes = [registration, patientSearch, appointment, billing, billSearch];
export const upcomingRoutes = [reports, certificates, packageManagement, canteen, pharmacy, reimbursements, insurance, certificateCreation, referrals];
export const adminRoutes = [addMedicine, addTest, addDoctor, serviceCatalogue];
