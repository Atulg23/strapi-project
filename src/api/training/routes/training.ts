/**
 * Training Router
 *
 * This file defines custom routes for the `training` API. 
 * Each route maps to a specific controller function in the training controller.
 */

export default {
    routes: [
      /**
       * Route: Fetch all trainings
       * Method: GET
       * Path: /trainings
       * Handler: filteredTrainings (controller function)
       * Auth: false (no authentication required)
       */
      {
        method: 'GET',
        path: '/trainings',
        handler: 'training.filteredTrainings',
        config: {
          auth: false, // Set to 'true' to require authentication
        },
      },
  
      /**
       * Route: Fetch active trainings
       * Method: GET
       * Path: /trainings/active
       * Handler: activeTrainings (controller function)
       * Auth: false (no authentication required)
       */
      {
        method: 'GET',
        path: '/trainings/active',
        handler: 'training.activeTrainings',
        config: {
          auth: false,
        },
      },
  
      /**
       * Route: Fetch upcoming trainings
       * Method: GET
       * Path: /trainings/up-coming
       * Handler: upcomingTrainings (controller function)
       * Auth: false (no authentication required)
       */
      {
        method: 'GET',
        path: '/trainings/up-coming',
        handler: 'training.upcomingTrainings',
        config: {
          auth: false,
        },
      },
  
      /**
       * Route: Fetch completed trainings
       * Method: GET
       * Path: /trainings/complet
       * Handler: completedTrainings (controller function)
       * Auth: false (no authentication required)
       */
      {
        method: 'GET',
        path: '/trainings/complet',
        handler: 'training.completedTrainings',
        config: {
          auth: false,
        },
      },
  
      /**
       * Route: Fetch count of trainings by status
       * Method: GET
       * Path: /trainings/countt
       * Handler: count (controller function)
       * Auth: false (no authentication required)
       */
      {
        method: 'GET',
        path: '/trainings/countt',
        handler: 'training.count',
        config: {
          auth: false,
        },
      },
    ],
  };
  