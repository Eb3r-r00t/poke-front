import {createRouter, createWebHashHistory} from 'vue-router';
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'dashboard',
        exact: true,
        component: () => import('./components/Dashboard.vue'),
        meta: {
            breadcrumb: [{ label: 'Dashboard' }],
        }
    },
    {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('./components/FormLayoutDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }],
        },
    },
    {
        path: '/invalidstate',
        name: 'invalidstate',
        component: () => import('./components/InvalidStateDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Invalid State' }],
        },
    },
    {
        path: '/input',
        name: 'input',
        component: () => import('./components/InputDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Input' }],
        },
    },
    {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('./components/FloatLabelDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Float Label' }],
        },
    },
    {
        path: '/button',
        name: 'button',
        component: () => import('./components/ButtonDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Button' }],
        },
    },
    {
        path: '/table',
        name: 'table',
        component: () => import('./components/TableDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Table' }],
        },
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('./components/ListDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'List' }],
        },
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('./pages/TimelineDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Timeline' }],
        },
    },
    {
        path: '/tree',
        name: 'tree',
        component: () => import('./components/TreeDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Tree' }],
        },
    },
    {
        path: '/panel',
        name: 'panel',
        component: () => import('./components/PanelsDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Panel' }],
        },
    },
    {
        path: '/overlay',
        name: 'overlay',
        component: () => import('./components/OverlayDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Overlay' }],
        },
    },
    {
        path: '/media',
        name: 'media',
        component: () => import('./components/MediaDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Media' }],
        },
    },
    {
        path: '/menu',
        component: () => import('./components/MenuDemo.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/menu/PersonalDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
            {
                path: '/menu/seat',
                component: () => import('./components/menu/SeatDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
            {
                path: '/menu/payment',
                component: () => import('./components/menu/PaymentDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
            {
                path: '/menu/confirmation',
                component: () => import('./components/menu/ConfirmationDemo.vue'),
                meta: {
                    breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
                },
            },
        ],
    },
    {
        path: '/messages',
        name: 'messages',
        component: () => import('./components/MessagesDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Messages' }],
        },
    },
    {
        path: '/file',
        name: 'file',
        component: () => import('./components/FileDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'File' }],
        },
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import('./components/ChartsDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Charts' }],
        },
    },
    {
        path: '/misc',
        name: 'misc',
        component: () => import('./components/MiscDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'UI Kit', label: 'Misc' }],
        },
    },
    {
        path: '/icons',
        name: 'icons',
        component: () => import('./utilities/Icons.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Icons' }],
        },
    },
    {
        path: '/widgets',
        name: 'widgets',
        component: () => import('./utilities/Widgets.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Widgets' }],
        },
    },
    {
        path: '/grid',
        name: 'grid',
        component: () => import('./utilities/GridDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Grid System' }],
        },
    },
    {
        path: '/spacing',
        name: 'spacing',
        component: () => import('./utilities/SpacingDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Spacing' }],
        },
    },
    {
        path: '/elevation',
        name: 'elevation',
        component: () => import('./utilities/ElevationDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Elevation' }],
        },
    },
    {
        path: '/typography',
        name: 'typography',
        component: () => import('./utilities/Typography.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Typography' }],
        },
    },
    {
        path: '/display',
        name: 'display',
        component: () => import('./utilities/DisplayDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Display' }],
        },
    },
    {
        path: '/flexbox',
        name: 'flexbox',
        component: () => import('./utilities/FlexBoxDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Flexbox' }],
        },
    },
    {
        path: '/text',
        name: 'text',
        component: () => import('./utilities/TextDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Utilities', label: 'Text' }],
        },
    },
    {
        path: '/crud',
        name: 'crud',
        component: () => import('./pages/CrudDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Crud' }],
        },
    },
    {
        path: '/brands',
        name: 'brands',
        component: () => import('./pages/Crud/BrandsPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Brands' }],
        }
    },
    {
        path: '/structure_types',
        name: 'structure_types',
        component: () => import('./pages/Crud/StructureTypesPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Structure Types' }],
        }
    },
    {
        path: '/inverters',
        name: 'inverters',
        component: () => import('./pages/Crud/Products/InverterPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Inverters' }],
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('./pages/Crud/UsersPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Users' }],
        }
    },
    {
        path: '/modules',
        name: 'modules',
        component: () => import('./pages/Crud/Products/ModulePage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Modules' }],
        }
    },
    {
        path: '/structures',
        name: 'structures',
        component: () => import('./pages/Crud/Products/StructuresPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Structures' }],
        }
    },
    {
        path: '/Transformers',
        name: 'Transformers',
        component: () => import('./pages/Crud/Products/TransformerPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Transformers' }],
        }
    },
    {
        path: '/String_box',
        name: 'String_box',
        component: () => import('./pages/Crud/Products/Others/StringBoxPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'String Box' }],
        }
    },
    {
        path: '/Connectors',
        name: 'Connectors',
        component: () => import('./pages/Crud/Products/Others/ConnectorsPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Connectors' }],
        }
    },
    {
        path: '/Cables',
        name: 'Cables',
        component: () => import('./pages/Crud/Products/Others/CablesPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Cables' }],
        }
    },
    {
        path: '/gpus',
        name: 'gpus',
        component: () => import('./pages/Crud/GpusPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Gpus' }],
        }
    },
    {
        path: '/rigs',
        name: 'rigs',
        component: () => import('./pages/Crud/RigsPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Rigs' }],
        }
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('./pages/Crud/ProductsPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Products' }],
        }
    },
    {
        path: '/product_categories',
        name: 'product categories',
        component: () => import('./pages/Crud/ProductCategoriesPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Product Categories' }],
        }
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('./pages/CalendarDemo.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Calendar' }],
        },
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () => import('./pages/Invoice.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Invoice' }],
        },
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('./pages/Help.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Help' }],
        },
    },
    {
        path: '/empty',
        name: 'empty',
        component: () => import('./components/EmptyPage.vue'),
        meta: {
            breadcrumb: [{ parent: 'Pages', label: 'Empty Page' }],
        },
    },
    {
        path: '/documentation',
        name: 'documentation',
        component: () => import('./components/Documentation.vue'),
        meta: {
            breadcrumb: [{ label: 'Documentation' }],
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue'),
        meta: {
            noAuth: true,
        }
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    },
	{
		path: '/wizard',
		name: 'wizard',
		component: () => import('./pages/Wizard.vue')
	},
    {
        path: '/blocks',
        name: 'blocks',
        component: () => import('./components/BlocksDemo.vue'),
        meta: {
            breadcrumb: [{ label: 'Blocks' }],
        },
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior () {
        return { left: 0, top: 0 };
    }
});

router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.noAuth)) {
        if (!store.getters.authenticated) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
