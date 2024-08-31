import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movie";

export class MovieController {
  // Get all movies with caching
  static async getAllMovies(req: Request, res: Response) {
    try {
      const data = cache.get("data");
      if (data) {
        console.log("Serving from cache");
        return res.status(200).json({ data });
      } else {
        console.log("Serving from db");
        const movieRepository = AppDataSource.getRepository(Movie);
        const movies = await movieRepository.find();
        cache.put("data", movies, 10000); // Cache for 10 seconds
        return res.status(200).json({ data: movies });
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Create a new movie
  static async createMovies(req: Request, res: Response) {
    try {
      const movies = req.body; // Assuming the request body is an array of movie objects
  
      // Validate request data
      if (!Array.isArray(movies) || movies.length === 0) {
        return res.status(400).json({ message: "No movies provided" });
      }
  
      // Validate each movie object
      for (const movie of movies) {
        const { title, description, director, year, rating, image, cast } = movie;
        if (!title || !description || !director || !year || !rating || !image || !cast) {
          return res.status(400).json({ message: "All fields are required for every movie" });
        }
      }
  
      // Save all movies to the database
      const movieRepository = AppDataSource.getRepository(Movie);
      const savedMovies = await movieRepository.save(movies);
  
      return res.status(201).json({ message: "Movies created successfully", movies: savedMovies });
    } catch (error) {
      console.error("Error creating movies:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update an existing movie
  static async updateMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, director, year, rating, image, cast } = req.body;

      const movieRepository = AppDataSource.getRepository(Movie);
      const movie = await movieRepository.findOne({ where: { id } });

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      // Update movie properties
      movie.title = title ?? movie.title;
      movie.description = description ?? movie.description;
      movie.director = director ?? movie.director;
      movie.year = year ?? movie.year;
      movie.rating = rating ?? movie.rating;
      movie.image = image ?? movie.image;
      movie.cast = cast ?? movie.cast;

      await movieRepository.save(movie);

      return res.status(200).json({ message: "Movie updated successfully", movie });
    } catch (error) {
      console.error("Error updating movie:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a movie
  static async deleteMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const movieRepository = AppDataSource.getRepository(Movie);
      const movie = await movieRepository.findOne({ where: { id } });

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      await movieRepository.remove(movie);

      return res.status(200).json({ message: "Movie deleted successfully", movie });
    } catch (error) {
      console.error("Error deleting movie:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
