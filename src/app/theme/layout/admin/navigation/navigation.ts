export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  // {
  //   id: 'page',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'Authentication',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'ti ti-key',
  //       children: [
  //         {
  //           id: 'login',
  //           title: 'Login',
  //           type: 'item',
  //           url: '/login',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'register',
  //           title: 'Register',
  //           type: 'item',
  //           url: '/register',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    id: 'customers',
    title: 'Customers Management',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'add',
        title: 'Add Customer',
        type: 'item',
        classes: 'nav-item',
        url: '/form/customer',
        icon: 'ti ti-typography'
      },
      {
        id: 'view',
        title: 'View Customers',
        type: 'item',
        classes: 'nav-item',
        url: '/customers',
        icon: 'ti ti-brush'
      },
      {
        id: 'open',
        title: 'Open An Account',
        type: 'item',
        classes: 'nav-item',
        url: '/form/account',
        icon: 'ti ti-plant-2',
        target: true,
        external: false
      }
    ]
  },
  // {
  //   id: 'transactions',
  //   title: 'Transactions',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'view',
  //       title: 'View All Transactions',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.gitbook.io/berry-angular/',
  //       icon: 'ti ti-vocabulary',
  //       target: true,
  //       external: false
  //     }
  //   ]
  // },
  {
    id: 'alerts',
    title: 'Alerts & Frauds',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'view',
        title: 'View Alerts',
        type: 'item',
        url: '/alerts',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'suspicious',
        title: 'Suspicious Transactions',
        type: 'item',
        classes: 'nav-item',
        url: '/suspects',
        icon: 'ti ti-vocabulary',
        target: true,
        external: false
      }
    ]
  },{
    id: 'rules',
    title: 'Rules & Conditions',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      // {
      //   id: 'rule',
      //   title: 'Add Rule',
      //   type: 'item',
      //   url: '/form/rule',
      //   classes: 'nav-item',
      //   icon: 'ti ti-brand-chrome'
      // },
      // {
      //   id: 'condition',
      //   title: 'Add Condition',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/addCondition',
      //   icon: 'ti ti-vocabulary',
      //   target: true,
      //   external: false
      // },
      {
        id: 'view',
        title: 'View Rules & Conditions',
        type: 'item',
        classes: 'nav-item',
        url: '/rules',
        icon: 'ti ti-vocabulary',
        target: true,
        external: false
      }
    ]
  }
];
