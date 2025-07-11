## Project Overview

This is a responsive, modern Casino Game Lobby built using Next.js. It allows users to explore, search, and filter casino games with infinite scrolling, favorites functionality, and persistent storage using localStorage.

The goal is to demonstrate production-grade proficiency in component architecture, state management, performance optimization, and styling.

## Tech Stack

 Feature           Tool/Library                            
 -------------------------------------------
 Framework         Next.js                 
 Data Fetching     React Query                             
 State Management  Zustand (for favorite games)                     
 Styling           SCSS Modules                            
 Infinite Scroll   useInfiniteQuery + IntersectionObserver           

## Key Features 

# Static Game Cards 
    The UI loads with section wise game cards.
    In case of no query, no filters or zero search results, these static cards are shown for better user experience.

# Search & Filter 
    As the user types in the input field , game cards fetched from search API and game cards are displayed on the screen. 
    Filters allow category-based filtering of games using games API. 
    Only one filter can be applied at a time.

# Infinite Scroll & Games Fetching
    A custom InfiniteScroll component listens via IntersectionObserver and triggers fetching of the next page.
    Games are fetched using useInfiniteQuery from React Query
    Pagination implemented using offset + limit
    getNextPageParam calculates continuation based on total count.

# Favorites Functionality
    Users can add games to  "Favorites" or remove games from "Favorites" directly from game cards
    Favorite games are stored in Zustand and synced with localStorage
    Selecting the "Favorites" filter displays only the favorited games

# Loading, Empty Error States
    Shimmers are shown are improved percieved performance during api fetching.
    Empty and error states are handled with appropriate messages.
    Errors during fetch are gracefully handled by React Query.

# Styling
    All components are styled using SCSS Modules for scoped, maintainable styles
    Custom loader and shimmer effects implemented for a premium casino feel
    Card hover includes subtle motion for better interactivity
    Responsive design ensures proper layout on mobile and desktop

# Persistence
    Favorite games are saved in localStorage
    On app load, Zustand initializes state from storage for continuity. 




## Implementation Decisions

#  Modular Component Architecture

    Why?
    Promotes reusability and separation of concerns
    Makes testing and styling easier

# API Fetching via Custom Hooks

    Why?
    To encapsulate searching, pagination and filtering logic in a reusable, testable unit
    Keeps components clean and focused on rendering
    Works perfectly with React Query’s useInfiniteQuery

    How?
    API call logic for games search is  abstracted into a custom hook useSearch.
    All API calls for paginated game data are abstracted into a custom hook useGames.
    useInfiniteQuery handles limit, offset, abort signal, and getNextPageParam

#  Infinite Scroll with Intersection Observer

    Why?
    Seamless user experience — new content loads as users scroll
    Efficient (no polling, no scroll event listeners)
    Pairs perfectly with paginated API and useInfiniteQuery

    How?
    InfiniteScroll.jsx uses a ref + IntersectionObserver
    Calls fetchNextPage() from React Query when sentinel div is visible

# Zustand for State Management 

    Why?
    Lightweight, minimal boilerplate
    Doesn’t require provider/context
    Perfect for simple global state like favorites and filters

    How?
    useFavouriteStore hook abstracts the logic for favouriting feature and provides access to favourites across
    the application 

# Zustand  Middleware for Persistent Storage

    Why?
    Required to persist favorite games across sessions using localStorage
    Zustand’s built-in persist middleware makes this simple and robust

    How?
    On load, Zustand rehydrates state from localStorage
    Users can close and return later with their favorites intact

# Shimmer Loader + Premium Loader Animation
    
    Why?
    Enhance perceived performance during content load
    Keep layout consistent while content is fetching
    Visually aligns with casino theme (e.g., glowing, gold shimmer)

    How?
    Placeholder shimmer shown until images load
    Shimmer + custom CSS loader for infinite scroll 

# AbortController for Better Performance

    Why?
    Prevents unnecessary or outdated network requests.
    Frees up resources by cancelling pending requests on component unmount or re-fetch.
    Avoids race conditions and memory leaks, improving app responsiveness.

    How?
    Used AbortController inside custom API hooks.
    Passed controller.signal to fetch or Axios config.
    Ensured only the latest request gets processed by aborting any previous requests.


## How to run
    Use: npm run dev