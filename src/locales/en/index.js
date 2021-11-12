import en_appointment from "./en.appointment";
import en_category from "./en.category";
import en_service from "./en.services";
import en_user from "./en.user";

const en_lang = {
    translation: {
        ...en_user,
        ...en_category,
        ...en_service,
        ...en_appointment,

        //Sidebar
        dashboard: "Dashboard",
        overview: "Overview",
        general: "General",
        management: "Management",
        operation: "Operation",
        appointments: "Appointments",
        services: "Services",
        profile: "Profile",
        categories: "Categories",
        rating: "Rating",
        users: "Users",
        shops: "Shops",
        //End Sidebar

        //Alternate Title
        alt_dashboard: "Dashboard",
        alt_overview: "Overview",
        alt_general: "General",
        alt_management: "Management",
        alt_appointments: "Appointment",
        alt_services: "Services",
        alt_categories: "Categories",
        alt_rating: "Rating",
        alt_users: "Users",
        alt_shops: "Shops",
        //End Alternate Title

        app: "App",
        login: "Login",
        register: "Register",
        personalInfo: "Personal Info",
        shopInfo: "Shop Info",
        dontHaveAccount: "Dont have an account?",
        alreadyHaveAccount: "Already have an account?",
        forgotPassword: "Forgot password?",
        welcomeBack: "Welcome back!",
        getStarted: "Let's get started",
        createNewAccount: "Create a new account",
        missingId: "Missing Id",
        shopList: "Shop List",
        userList: "User List",
        appointmentList: "Appointment List",
        serviceList: "Service List",
        serviceList: "Service List",
        active: "Active",
        inactive: "Inactive",
        emptyData: "Empty Data",
        goBack: "Go Back",

        //Search Text
        searchCategory: "Search category name",
        searchUser: "Search user name",
        searchShop: "Search shop name",
        searchAppointment: "Search appointment name",
        searchService: "Search service name",
        //End Search Text

        //Form Text
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password",
        shopName: "Shop name",
        category: "Category",
        submitBtn: "Submit",
        type: "Type",
        house: "House",
        street: "Street",
        city: "City",
        state: "State",
        zipCode: "Zip code",
        country: "Country",
        shopCategory: "Shop category",
        shopDescription: "Shop description",
        //End Form Text

        //Message Text
        updateSuccess: "Update Success",
        updateFailed: "Update Failed",
        createSuccess: "Create Success",
        createFailed: "Create Failed",
        deleteSuccess: "Delete Success",
        deleteFailed: "Delete Failed",
        //End Message Text

        //Status Text
        pending: "Pending",
        completed: "Completed",
        canceled: "Canceled",
        //End Status Text

        //Dialog Text
        confirmDialog: "Are you sure?",
        confirmDialogPlaceholder: "Are you sure you want to do this operation",
        confirmDelete: "Confirm Delete",
        confirmDeleteText: "Are you sure you want to delete this",
        confirmDeletePlaceholder: "Are you sure want to delete",
        confirmComplete: "Confirm Complete",
        confirmCompletePlaceholder: "Are you sure want to complete",
        confirmCancel: "Confirm Cancel",
        confirmCancelPlaceholder: "Are you sure want to cancel",
        confirmStatusChange: "Confirm Status Change",
        confirmStatusChangePlaceholder: "Are you sure you want to change the status",
        confirmStatusChangeText: "Are you sure you want to change the status of",
        confirmActiveStatus: "Confirm Active Status",
        changePwd: "Change Password",
        confirmActiveStatusPlaceholder: "Are you sure you want to change the active status",
        confirmActiveStatusText: "Are you sure you want to change the active status of",
        //End Dialog Text

        //Button Text
        confirm: "Confirm",
        cancel: "Cancel",
        complete: "Complete",
        delete: "Delete",
        view: "View",
        edit: "Edit",
        addBtn: "Add",
        search: "Search",
        changeStatus: "Change Status",
        resetPwd: "Reset Password",
        //End Button Text

        //Filter Text
        asc: "Ascending",
        desc: "Descending",
        filterOption: "Filter Options",
        createAt: "Create at",
        updateAt: "Update at",
        applyFilter: "Apply filter",
        resetFilter: "Reset filter",
        //End Filter Text

        //Table Text
        id: "Id",
        name: "Name",
        remark: "Remark",
        actions: "Actions",
        price: "Price",
        logo: "Logo",
        dob: "Date of Birth",
        phoneNumber: "Phone Number",
        description: "Description",
        createdAt: "Created at",
        updatedAt: "Updated at",
        image: "Image",
        isActive: "Is Active",
        accountType: "Account Type",
        serviceName: "Service Name",
        unitPrice: "Unit Price",
        totalPrice: "Total Price",
        //End Table Text

        //Account Type Text
        admin: "Admin",
        user: "User",
        superAdmin: "Super Admin",
        unknown: "Unknown",
        //End Account Type Text
    }
};

export default en_lang;