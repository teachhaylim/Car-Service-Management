import kh_appointment from "./kh.appointment";
import kh_category from "./kh.category";
import kh_profile from "./kh.profile";
import kh_service from "./kh.services";
import kh_shop from "./kh.shop";
import kh_user from "./kh.user";

const kh_lang = {
    translation: {
        ...kh_user,
        ...kh_category,
        ...kh_service,
        ...kh_appointment,
        ...kh_shop,
        ...kh_profile,

        //Sidebar
        dashboard: "ទាំងគ្រប់គ្រង",
        overview: "ផ្ទាំងព័ត៌មានទូទៅ",
        general: "ផ្នែកទូទៅ",
        management: "ផ្នែកគ្រប់គ្រង",
        operation: "ប្រតិបត្តិការ",
        appointments: "ការណាត់ជួប",
        services: "សេវាកម្ម",
        profile: "ប្រវត្តិរូប",
        categories: "ប្រភេទ",
        rating: "ការវាយតម្លៃ",
        users: "អ្នកប្រើប្រាស់",
        shops: "ហាង",
        //End Sidebar

        //Alternate Title
        alt_dashboard: "ទាំងគ្រប់គ្រង",
        alt_overview: "ផ្ទាំងព័ត៌មានទូទៅ",
        alt_general: "ផ្នែកទូទៅ",
        alt_management: "ផ្នែកគ្រប់គ្រង",
        alt_operation: "ប្រតិបត្តិការ",
        alt_appointments: "ការណាត់ជួប",
        alt_services: "សេវាកម្ម",
        alt_profile: "ប្រវត្តិរូប",
        alt_categories: "ប្រភេទ",
        alt_rating: "ការវាយតម្លៃ",
        alt_users: "អ្នកប្រើប្រាស់",
        alt_shops: "ហាង",
        //End Alternate Title

        //Other
        app: "កម្មវិធី",
        active: "សកម្ម",
        inactive: "អសកម្ម",
        statistics: "ស្ថិតិ",
        generalInfo: "ព័ត៌មានទូទៅ",
        totalIncome: "ប្រាក់ចំណូលសរុប",
        totalAppointments: "ការណាត់ជួបសរុប",
        totalServices: "សេវាកម្មសរុប",
        totalCategories: "ប្រភេទសរុប",
        totalUsers: "អ្នកប្រើប្រាស់សរុប",
        totalShops: "ហាងសរុប",
        pendingAppointments: "ការណាត់ជួបដែលមិនទាន់សម្រេច",
        completedAppointments: "ការណាត់ជួបដែលបានបញ្ចប់",
        canceledAppointments: "ការណាត់ជួបដែលបានលុបចោល",
        numberOfAppointments: "ចំនួននៃការណាត់ជួប",
        numberOfAppointedServices: "ចំនួនសេវាកម្មដែលបានកក់ទុក",
        newlyRegisteredUsers: "អ្នកប្រើប្រាស់ដែលបានចុះឈ្មោះថ្មី",
        newlyRegisteredShops: "ហាងដែលបានចុះឈ្មោះថ្មី",
        //End Other

        //Authentication & Authorization
        login: "ចូល",
        register: "ចុះឈ្មោះ",
        dontHaveAccount: "កុំមានគណនី?",
        alreadyHaveAccount: "មានគណនីរួចហើយ?",
        forgotPassword: "ភ្លេច​លេខសំងាត់​?",
        welcomeBack: "ស្វា​គម​ន៏​ការ​ត្រ​លប់​មក​វិញ!",
        getStarted: "តោះ​ចាប់ផ្តើម",
        createNewAccount: "បង្កើតគណនីថ្មី",
        //End Authentication & Authorization

        //401 Message
        unauthorized: "Unauthorized",
        unauthorizedMessage: "The page that you are trying to access is not publically available",
        unauthorizedSubMessage: "To access it please login first",
        //End 401 Message

        //404 Message
        notFoundMessage: "oop! page not found",
        notFoundSubMessage: "You must have picked the wrong door because I haven't been able to lay my eyes on the page you've been searching for",
        //End 404 Message

        //Search Text
        searchCategory: "ស្វែងរកឈ្មោះប្រភេទ",
        searchUser: "ស្វែងរកឈ្មោះអ្នកប្រើប្រាស់",
        searchShop: "ស្វែងរកឈ្មោះហាង",
        searchAppointment: "ស្វែងរកឈ្មោះណាត់ជួប",
        searchService: "ស្វែងរកឈ្មោះសេវាកម្ម",
        //End Search Text

        //Form Text
        firstName: "ឈ្មោះដំបូង",
        lastName: "នាមត្រកូល",
        email: "អ៊ីមែល",
        password: "ពាក្យសម្ងាត់",
        confirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់",
        shopName: "ឈ្មោះហាង",
        category: "ប្រភេទ",
        submitBtn: "ដាក់ស្នើ",
        type: "ប្រភេទ",
        house: "លេខ​ផ្ទះ",
        street: "ផ្លូវ",
        city: "ទីក្រុង",
        state: "រដ្ឋ",
        zipCode: "លេខ​កូដ​តំបន់",
        country: "ប្រទេស",
        shopCategory: "ប្រភេទហាង",
        shopDescription: "ការពិពណ៌នាហាង",
        shopOwned: "ជាកម្មសិទ្ធិរបស់ហាង",
        //End Form Text

        //Message Text
        updateSuccess: "ធ្វើប្រតិបត្តិការបានជោគជ័យ",
        updateFailed: "ធ្វើប្រតិបត្តិការបានបរាជ័យ",
        createSuccess: "បានបង្កើតដោយជោគជ័យ",
        createFailed: "បានបង្កើតបរាជ័យ",
        deleteSuccess: "លុបជោគជ័យ",
        deleteFailed: "លុបបានបរាជ័យ",
        uploadSuccess: "បង្ហោះជោគជ័យ",
        uploadFailed: "បង្ហោះបានបរាជ័យ",
        missingId: "បាត់លេខសម្គាល់",
        emptyData: "ទិន្នន័យទទេ",
        //End Message Text

        //Status Text
        pending: "កំពុងរង់ចាំ",
        completed: "បានបញ្ចប់",
        canceled: "បានលុបចោល",
        //End Status Text

        //Dialog Text
        confirmDialog: "តើ​អ្នក​ប្រាកដ​ឬ​អត់?",
        confirmDialogPlaceholder: "តើអ្នកប្រាកដទេថាអ្នកចង់ធ្វើប្រតិបត្តិការនេះ។",
        confirmDelete: "បញ្ជាក់ការលុប",
        confirmDeleteText: "តើអ្នកប្រាកដទេថាអ្នកចង់លុបវាចោល",
        confirmDeletePlaceholder: "តើ​អ្នក​ប្រាកដ​ជា​ចង់​លុប",
        confirmComplete: "បញ្ជាក់ពេញលេញ",
        confirmCompletePlaceholder: "តើ​អ្នក​ប្រាកដ​ជា​ចង់​បញ្ចប់",
        confirmCancel: "បញ្ជាក់ បោះបង់",
        confirmCancelPlaceholder: "តើ​អ្នក​ប្រាកដ​ជា​ចង់​បោះបង់",
        confirmStatusChange: "បញ្ជាក់ការផ្លាស់ប្តូរស្ថានភាព",
        confirmStatusChangePlaceholder: "តើអ្នកប្រាកដទេថាអ្នកចង់ផ្លាស់ប្តូរស្ថានភាព",
        confirmStatusChangeText: "តើអ្នកប្រាកដថាអ្នកចង់ផ្លាស់ប្តូរស្ថានភាពរបស់",
        confirmActiveStatus: "បញ្ជាក់ស្ថានភាពសកម្ម",
        changePwd: "ផ្លាស់ប្តូរពាក្យសម្ងាត់",
        confirmActiveStatusPlaceholder: "តើអ្នកប្រាកដថាចង់ផ្លាស់ប្តូរស្ថានភាពសកម្ម",
        confirmActiveStatusText: "តើអ្នកប្រាកដថាចង់ផ្លាស់ប្តូរស្ថានភាពសកម្មរបស់",
        //End Dialog Text

        //Button Text
        confirm: "យល់ព្រម",
        cancel: "បោះបង់",
        complete: "បញ្ចប់",
        delete: "លុប",
        view: "មើល",
        edit: "កែសម្រួល",
        addBtn: "បន្ថែម",
        search: "ស្វែងរក",
        changeStatus: "ផ្លាស់ប្តូរស្ថានភាព",
        resetPwd: "កំណត់ពាក្យសម្ងាត់ឡើងវិញ",
        returnToLogin: "ត្រឡប់ទៅ ចូល",
        notFoundButton: "ជ្រើសរើសទ្វារថ្មី។",
        goBack: "ត្រឡប់​ក្រោយ",
        upload: "ផ្ទុកឡើង",
        logOut: "ចាកចេញ",
        //End Button Text

        //Filter Text
        asc: "ឡើង",
        desc: "ចុះ",
        filterOption: "ជម្រើសតម្រង",
        createAt: "បង្កើតនៅ",
        updateAt: "ធ្វើបច្ចុប្បន្នភាពនៅ",
        applyFilter: "អនុវត្តតម្រង",
        resetFilter: "កំណត់តម្រងឡើងវិញ",
        //End Filter Text

        //Table Text
        id: "លេខសម្គាល់",
        name: "ឈ្មោះ",
        remark: "ចំណាំ",
        actions: "សកម្មភាព",
        price: "តម្លៃ",
        logo: "និមិត្តសញ្ញា",
        dob: "ថ្ងៃខែ​ឆ្នាំ​កំណើត",
        phoneNumber: "លេខទូរសព្ទ",
        description: "ការពិពណ៌នា",
        createdAt: "បង្កើតនៅ",
        updatedAt: "បានធ្វើបច្ចុប្បន្នភាពនៅ",
        image: "រូបភាព",
        isActive: "សកម្ម",
        accountType: "ប្រភេទ​គណនី",
        serviceName: "ឈ្មោះសេវាកម្ម",
        unitPrice: "តម្លៃ​ឯកតា",
        totalPrice: "តម្លៃ​សរុប",
        //End Table Text

        //Account Type Text
        admin: "អ្នកគ្រប់គ្រង",
        user: "អ្នក​ប្រើ",
        superAdmin: "អ្នកគ្រប់គ្រងជាន់ខ្ពស់",
        unknown: "មិនស្គាល់",
        //End Account Type Text
    }
};

export default kh_lang;