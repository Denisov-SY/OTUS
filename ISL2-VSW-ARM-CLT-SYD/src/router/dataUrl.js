const ports = {
  "http:": 18080,
  "https:": 18443,
};

const parseUrl = new URL(document.URL);

const url = {
  server: `${parseUrl.protocol}//${parseUrl.hostname}:${
    ports[parseUrl.protocol]
  }`,

  sys: {
    login: "/login",
    logout: "/logout",
    info: "/system/info",
    detail: "/system/detail",
  },

  admin: {
    dbLogs: "/admin/db-log",
    // access: {
    //   // users: "/admin/access/users",
    //   // roles: "/admin/access/roles",
    //   // permissions: "/admin/access/permissions",
    //   usersRoles: "/admin/access/users-roles",
    //   rolesPermissions: "/admin/access/roles-permissions",
    //   usersRolesPermissions: "/admin/access/users-roles-permissions",
    // },
  },
  dictionary: {
    strip: {
      status: {
        list: "/dictionary/strip/status/list",
      },
      position: {
        list: "/dictionary/strip/position/list",
      },
    },
    pipe: {
      status: {
        list: "/dictionary/pipe/status/list",
      },
      position: {
        list: "/dictionary/pipe/position/list",
      },
      standard: {
        list: "/dictionary/pipe/standard/list",
      },
      strengthgroup: {
        list: "/dictionary/pipe/strengthgroup/list",
      },
      bit_status: {
        list: "/dictionary/pipe/bit_status/list",
      },
    },
    package: {
      status: {
        list: "/dictionary/pck/status/list",
      },
    },
    attr: {
      list: "/dictionary/attr/list",
      save: "/dictionary/attr/save",
    },
    attrTable: {
      list: "/dictionary/attr/att/get",
      save: "/dictionary/attr/att/save",
    },
    measureUnit: {
      list: "/dictionary/attr/mu/get",
      save: "/dictionary/attr/mu/save",
    },

    access: {
      user: {
        list: "/dictionary/access/users/get",
        save: "/dictionary/access/users/save",
      },
      role: {
        list: "/dictionary/access/roles/get",
        save: "/dictionary/access/roles/save",
      },
      permission: {
        list: "/dictionary/access/permissions/get",
        save: "/dictionary/access/permissions/save",
      },
    },
    label: {
      printer: {
        list: "/dictionary/label/printer/list",
        save: "/dictionary/label/printer/save",
      },
      template: {
        list: "/dictionary/label/template/list",
        save: "/dictionary/label/template/save",
      },
    },

  },
  tracking: {

    strip: {
      list: "/tracking/strip/list",
      get: "/tracking/strip/get",
      save: "/tracking/strip/save",
    },
    pipe: {
      list: "/tracking/pipe/list",

    },

    techOp: {
      strip: {
        // list: "/tracking/techop/strip/list",
        get: "/tracking/techop/strip/get",
        trend: "/tracking/techop/strip/trend",
      },

    },
  },


  report: {
    task: {
      get: "/report/task/get",
      upd: "/report/task/upd",
    },
    report: {
      generate: "/report/generate",
      check: "/report/check",
      file: "/report/file",
    },
  },
  label: {
    list: "/label/list",
    get: "/label/get",
    upload: "/label/upload",
    print: "/label/print",
  },
  ui: {
    params: {
      get: "/ui/params/get",
      save: "/ui/params/save",
    },
  },
};
export const sys = {
  login: url.server + url.sys.login,
  logout: url.server + url.sys.logout,
  info: url.server + url.sys.info,
  detail: url.server + url.sys.detail,
};




export const admin = {
  dbLogs: url.server + url.admin.dbLogs,
  // access: {
  //   users: url.server + url.admin.access.users,
  //   roles: url.server + url.admin.access.roles,
  //   // permissions: url.server + url.admin.access.permissions,
  //   usersRoles: url.server + url.admin.access.usersRoles,
  //   rolesPermissions: url.server + url.admin.access.rolesPermissions,
  //   usersRolesPermissions: url.server + url.admin.access.usersRolesPermissions,
  // },
};

export const dictionary = {

  strip: {
    status: {
      list: url.server + url.dictionary.strip.status.list,
    },
    position: {
      list: url.server + url.dictionary.strip.position.list,
    },
  },
  pipe: {
    status: {
      list: url.server + url.dictionary.pipe.status.list,
    },
    position: {
      list: url.server + url.dictionary.pipe.position.list,
    },
    standard: {
      list: url.server + url.dictionary.pipe.standard.list,
    },
    strengthgroup: {
      list: url.server + url.dictionary.pipe.strengthgroup.list,
    },
    bit_status: {
      list: url.server + url.dictionary.pipe.bit_status.list,
    },
  },
  package: {
    status: {
      list: url.server + url.dictionary.package.status.list,
    },
  },

  attr: {
    list: url.server + url.dictionary.attr.list,
    save: url.server + url.dictionary.attr.save,
  },
  attrTable: {
    list: url.server + url.dictionary.attrTable.list,
    save: url.server + url.dictionary.attrTable.save,
  },
  measureUnit: {
    list: url.server + url.dictionary.measureUnit.list,
    save: url.server + url.dictionary.measureUnit.save,
  },

  access: {
    user: {
      list: url.server + url.dictionary.access.user.list,
      save: url.server + url.dictionary.access.user.save,
    },
    role: {
      list: url.server + url.dictionary.access.role.list,
      save: url.server + url.dictionary.access.role.save,
    },
    permission: {
      list: url.server + url.dictionary.access.permission.list,
      save: url.server + url.dictionary.access.permission.save,
    },
  },
  label: {
    printer:{
      list: url.server + url.dictionary.label.printer.list,
      save: url.server + url.dictionary.label.printer.save,
    },
    template:{
      list: url.server + url.dictionary.label.template.list,
      save: url.server + url.dictionary.label.template.save,
    },
  },
  
};

export const tracking = {

  strip: {
    list: url.server + url.tracking.strip.list,
    get: url.server + url.tracking.strip.get,
    save: url.server + url.tracking.strip.save,
  },
  pipe: {
    list: url.server + url.tracking.pipe.list,

  },

  techOp: {
    strip: {
      // list: url.server + url.tracking.techOp.strip.list,
      get: url.server + url.tracking.techOp.strip.get,
      trend: url.server + url.tracking.techOp.strip.trend,
    },
  },
};




export const report = {
  task: {
    get: url.server + url.report.task.get,
    upd: url.server + url.report.task.upd,
  },
  report: {
    generate: url.server + url.report.report.generate,
    check: url.server + url.report.report.check,
    file: url.server + url.report.report.file,
  },
};

export const label = {
  list: url.server + url.label.list,
  get: url.server + url.label.get,
  upload: url.server + url.label.upload,
  print: url.server + url.label.print,
};

export const ui = {
  params: {
    get: url.server + url.ui.params.get,
    save: url.server + url.ui.params.save,
  },
};


