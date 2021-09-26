import en_category from "./en.category";
import en_user from "./en.user";

const en_lang = {
    translation: {
        ...en_user,
        ...en_category,

        //Sidebar
        dashboard: "Dashboard",
        overview: "Overview",
        general: "General",
        management: "Management",
        appointments: "Appointments",
        services: "Services",
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
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password",
        shopName: "Shop name",
        category: "Category",
        confirmDelete: "Confirm Delete",
        confirmDeleteText: "Are you sure you want to delete this",
        confirmDeletePlaceholder: "Are you sure want to delete",
        confirmBtn: "Confirm",
        cancelBtn: "Cancel",
        addBtn: "Add",
        search: "Search",
        asc: "Ascending",
        desc: "Descending",
        filterOption: "Filter Options",
        createAt: "Create at",
        updateAt: "Update at",
        applyFilter: "Apply filter",
        resetFilter: "Reset filter",
        id: "Id",
        remark: "Remark",
        actions: "Actions",
        missingId: "Missing Id",
        submitBtn: "Submit",
    }
};

export default en_lang;