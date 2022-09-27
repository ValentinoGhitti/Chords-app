export default {
  name: 'daybook',
  component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
  children: [
    {
      path: '',
      name: 'no-entry',
      component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/daybook/views/NoEntrySelected.vue'),
    },
    {
      path: '',
      name: 'non-existent-entry',
      component: () => import(/* webpackChunkName: "daybook-non-existent-entry" */ '@/modules/daybook/views/NonExistentEntry.vue'),
    },
    {
      path: ':id',
      name: 'entry',
      component: () => import(/* webpackChunkName: "daybook-entry" */ '@/modules/daybook/views/EntryView.vue'),
      props: ( route ) => {
        return {
          id: route.params.id
        }
      }
    }
  ]
}
