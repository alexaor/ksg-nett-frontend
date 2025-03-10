export const PERMISSIONS = {
  // ===== ADMISSIONS ======
  admissions: {
    add: {
      admission: 'admissions.add.admission',
      applicant: 'admissions.add_applicant',
      internalGroupPriority: 'admissions.add.internalgrouppriority',
    },
    change: {
      interview: 'admissions.change_interview',
      admission: 'admissions.change_admission',
    },
    delete: {
      applicant: 'admissions.delete_applicant',
    },
    view: {
      admission: 'admissions.view_admission',
    },
  },
  // ===== ECONOMY ======
  economy: {
    add: {
      sociSession: 'economy.add_socisession',
    },
    view: {
      sociSession: 'economy.view_socisession',
    },
    change: {
      sociSession: 'economy.change_socisession',
      sociProduct: 'economy.change_sociproduct',
      deposit: 'economy.change_deposit',
    },
  },
  // ===== SUMMARIES ======
  summaries: {
    add: {
      summary: 'summaries.add_summary',
    },
    change: {
      summary: 'summaries.change_summary',
    },
    view: {
      summary: 'summaries.view_summary',
    },
  },

  // ===== BARTABS ======
  barTab: {
    view: {
      barTab: 'bar_tab.view_bartab',
      barTabCustomer: 'bar_tab.view_bartabcustomer',
    },
    add: {},
    change: {
      barTab: 'bar_tab.change_bartab',
    },
    delete: {
      barTab: 'bar_tab.delete_bartab',
    },
  },
  // ===== QUOTES ======
  quotes: {
    add: {
      quote: 'quotes.add_quote',
    },
    change: {
      quote: 'quotes.change_quote',
    },
    delete: {
      quote: 'quotes.delete_quote',
    },
    approve: {
      quote: 'quotes.approve_quote',
    },
    invalidate: {
      quote: 'quotes.invalidate_quote',
    },
    view: {
      quote: 'quotes.view_quote',
    },
  },
  // ===== USERS ======
  users: {
    change: {
      user: 'users.change_user',
      userType: 'users.change_usertype',
    },
    view: {
      user: 'users.view_user',
      userType: 'users.view_usertype',
    },
  },
  // ===== ORGANIZATION =====
  /**
   *           "organization.add_internalgrouppositionmembership",
            "organization.change_internalgrouppositionmembership",
            "organization.delete_internalgrouppositionmembership",
            "organization.view_internalgrouppositionmembership",
   */
  organization: {
    change: {
      internalGroup: 'organization.change_internalgroup',
      internalGroupPosition: 'organization.change_internalgroupposition',
      internalGroupPositionMembership:
        'organization.change_internalgrouppositionmembership',
    },
    add: {
      internalGroup: 'organization.add_internalgroup',
      internalGroupPosition: 'organization.add_internalgroupposition',
      internalGroupPositionMembership:
        'organization.add_internalgrouppositionmembership',
    },
    delete: {
      internalGroup: 'organization.delete_internalgroup',
      internalGroupPosition: 'organization.delete_internalgroupposition',
      internalGroupPositionMembership:
        'organization.delete_internalgrouppositionmembership',
    },
    view: {
      internalGroup: 'organization.view_internalgroup',
      internalGroupPosition: 'organization.view_internalgroupposition',
      internalGroupPositionMembership:
        'organization.view_internalgrouppositionmembership',
    },
  },

  // ===== SCHEDULES ======
  schedules: {
    add: {
      schedule: 'schedules.add_schedule',
      scheduleTemplate: 'schedules.add_scheduletemplate',
    },
    change: {
      schedule: 'schedules.change_schedule',
    },
    delete: {
      schedule: 'schedules.delete_schedule',
      scheduleTemplate: 'schedules.delete_scheduletemplate',
    },
    view: {
      schedule: 'schedules.view_schedule',
      scheduleTemplate: 'schedules.view_scheduletemplate',
    },
  },
}
