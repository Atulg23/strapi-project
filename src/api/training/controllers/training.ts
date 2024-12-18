/**
 * Training Controller
 * 
 * This controller handles various endpoints for managing training sessions:
 * - Fetch filtered trainings
 * - Fetch active trainings
 * - Fetch upcoming trainings
 * - Fetch completed trainings
 * - Count trainings by status
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::training.training', ({ strapi }) => ({
  
  /**
   * Fetch all trainings with populated employee relations.
   * This can be extended to filter trainings based on their status.
   * 
   * @param {Object} ctx - Context object for the request
   */
  async filteredTrainings(ctx) {
    console.log("ctx is", ctx);

    try {
      // Query to fetch all trainings and populate 'employees' relation
      const trainings = await strapi.db.query('api::training.training').findMany({
        populate: ['employees'], // Include related employees data
      });

      console.log("trainings", trainings);

      // Example for additional filtering (currently commented)
      /*
      const activeTrainings = trainings.filter(
        (training) => training.traningStatus === 'active'
      );
      */

      // Return the fetched trainings
      return ctx.send({
        trainings,
      });
    } catch (err) {
      console.log('error is', err);
      ctx.badRequest('Unable to fetch trainings'); // Return a 400 Bad Request response
    }
  },

  /**
   * Fetch active trainings.
   * 
   * @param {Object} ctx - Context object for the request
   */
  async activeTrainings(ctx) {
    try {
      // Query to fetch trainings where 'traningStatus' is 'active'
      const activeTrainings = await strapi.db.query('api::training.training').findMany({
        where: { traningStatus: 'active' }, // Filter by status
      });

      console.log("active trainings", activeTrainings);

      // Return the active trainings
      return ctx.send({
        activeTrainings,
      });
    } catch (err) {
      console.log('error is', err);
      ctx.badRequest('Unable to fetch active trainings');
    }
  },

  /**
   * Fetch upcoming trainings.
   * 
   * @param {Object} ctx - Context object for the request
   */
  async upcomingTrainings(ctx) {
    console.log("upcoming ctx", ctx);

    try {
      // Query to fetch trainings where 'traningStatus' is 'upcoming'
      const upcomingTrainings = await strapi.db.query('api::training.training').findMany({
        where: { traningStatus: 'upcoming' }, // Filter by status
      });

      console.log("upcoming trainings", upcomingTrainings);

      // Return the upcoming trainings
      return ctx.send({
        upcomingTrainings,
      });
    } catch (err) {
      console.log('error is', err);
      ctx.badRequest('Unable to fetch upcoming trainings');
    }
  },

  /**
   * Fetch completed trainings.
   * 
   * @param {Object} ctx - Context object for the request
   */
  async completedTrainings(ctx) {
    console.log("completed ctx", ctx);

    try {
      // Query to fetch trainings where 'traningStatus' is 'completed'
      const completedTrainings = await strapi.db.query('api::training.training').findMany({
        where: { traningStatus: 'completed' }, // Filter by status
      });

      console.log("completed trainings", completedTrainings);

      // Return the completed trainings
      return ctx.send({
        completedTrainings,
      });
    } catch (err) {
      console.log('error is', err);
      ctx.badRequest('Unable to fetch completed trainings');
    }
  },

  /**
   * Fetch count of trainings based on their status: active, upcoming, and completed.
   * 
   * @param {Object} ctx - Context object for the request
   */
  async count(ctx) {
    console.log("count ctx", ctx);

    try {
      // Query to count trainings with 'active' status
      const activeCount = await strapi.db.query('api::training.training').count({
        where: { traningStatus: 'active' },
      });

      // Query to count trainings with 'upcoming' status
      const upcomingCount = await strapi.db.query('api::training.training').count({
        where: { traningStatus: 'upcoming' },
      });

      // Query to count trainings with 'completed' status
      const completedCount = await strapi.db.query('api::training.training').count({
        where: { traningStatus: 'completed' },
      });

      console.log("Training counts:", {
        active: activeCount,
        upcoming: upcomingCount,
        completed: completedCount,
      });

      // Return the counts
      return ctx.send({
        active: activeCount,
        upcoming: upcomingCount,
        completed: completedCount,
      });
    } catch (err) {
      console.log('error is', err);
      ctx.badRequest('Unable to fetch training counts');
    }
  },
  /**
   * Fetch each of trainings details based on slug
   * 
   * @param {Object} ctx - Context object for the request
   */
  async findBySlug(ctx) {
    try {
      const { slug } = ctx.params; // Get slug from request parameters
      console.log("slug is", slug)  
      // Find the training where the slug matches
      const training = await strapi.db.query('api::training.training').findOne({
        where: { slug },
        populate: ['employees'], // Include employees relation if needed
      });
      console.log("training info", training)
      // If no training found, return 404
      if (!training) {
        return ctx.notFound('Training not found');
      }

      // Return the training details
      return ctx.send(training);
    } catch (err) {
      return ctx.badRequest('Unable to fetch training details',);
    }
  },
}));
