import {
  Box,
  Code,
  Database,
  Globe,
  Layers,
  MessageSquare,
  Terminal,
  Zap,
  LucideIcon,
} from "lucide-react";

export interface TechDetails {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  codeExample?: string;
}

export interface TechData {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  details: TechDetails;
}

export const techData: TechData[] = [
  {
    id: "nestjs",
    label: "NestJS",
    icon: Box,
    color: "text-red-500",
    details: {
      title: "NestJS Framework",
      subtitle: "Modular Backend Architecture",
      description:
        "NestJS serves as the core framework for our backend, providing a modular architecture that enables clean separation of concerns. The application is structured with modules for API endpoints, data collection, and worker processing.",
      features: [
        "Modular architecture with dependency injection",
        "Built-in support for TypeScript",
        "Microservices-ready with RabbitMQ integration",
        "RESTful API endpoints for frontend consumption",
        "Controller-based routing and service layer pattern",
      ],
      codeExample: "src/modules/api/api.module.ts",
    },
  },
  {
    id: "typescript",
    label: "TypeScript",
    icon: Terminal,
    color: "text-blue-400",
    details: {
      title: "TypeScript",
      subtitle: "Type-Safe Development",
      description:
        "TypeScript ensures type safety across the entire codebase, reducing runtime errors and improving developer experience. All services, DTOs, and modules are fully typed.",
      features: [
        "Full type coverage across the application",
        "Interface-based DTOs for API contracts",
        "Type-safe Prisma client integration",
        "Compile-time error detection",
        "Enhanced IDE autocomplete and refactoring",
      ],
    },
  },
  {
    id: "docker",
    label: "Docker",
    icon: Layers,
    color: "text-blue-600",
    details: {
      title: "Docker Containerization",
      subtitle: "Consistent Deployment Environment",
      description:
        "Docker containers ensure consistent environments across development, staging, and production. The application uses multi-stage builds for optimized production images.",
      features: [
        "Multi-stage Docker builds for optimization",
        "Separate containers for Collector, Workers, and API",
        "Docker Compose for local development",
        "Production-ready Dockerfile.prod",
        "Isolated service dependencies",
      ],
      codeExample: "docker-compose.yml",
    },
  },
  {
    id: "rabbitmq",
    label: "RabbitMQ",
    icon: MessageSquare,
    color: "text-orange-500",
    details: {
      title: "RabbitMQ Message Queue",
      subtitle: "Event-Driven Communication",
      description:
        "RabbitMQ acts as the message broker in our event-driven architecture. The Collector service pushes `match.collect` events to RabbitMQ queues, which are then consumed by Worker services with `prefetch: 1` to ensure reliability and prevent message loss.",
      features: [
        "Buffers `match.collect` events from Collector",
        "Reliable message delivery with acknowledgments",
        "Prefetch: 1 ensures one message per worker at a time",
        "Decouples Collector from Worker services",
        "Enables horizontal scaling of workers",
      ],
      codeExample: "src/core/queue/queue.service.ts",
    },
  },
  {
    id: "redis",
    label: "Redis",
    icon: Zap,
    color: "text-red-600",
    details: {
      title: "Centralized Rate Limiting",
      subtitle: "Redis-backed Sliding Window",
      description:
        "To respect Riot's API limits, we implement a Sliding Window algorithm stored in Redis. Each API key has its own bucket (`riot_requests:<key_hash>`). Distributed locks prevent race conditions across multiple worker containers.",
      features: [
        "Window Size: 120 seconds",
        "Max Requests: 100 per window",
        "Distributed Locks prevent race conditions",
        "Per-API-key rate limiting buckets",
        "Real-time rate limit status endpoint",
      ],
      codeExample: "GET /api/rate-limit/status",
    },
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    icon: Database,
    color: "text-blue-300",
    details: {
      title: "PostgreSQL Database",
      subtitle: "Relational Data Storage",
      description:
        "PostgreSQL stores all match data, champion statistics, and aggregated metrics. The database schema is managed through Prisma migrations, ensuring version control and consistency across environments.",
      features: [
        "Stores Matches, Stats & Aggregates",
        "ACID-compliant transactions",
        "Optimized indexes for query performance",
        "Prisma ORM integration",
        "Migration-based schema management",
      ],
      codeExample: "prisma/schema.prisma",
    },
  },
  {
    id: "prisma",
    label: "Prisma",
    icon: Code,
    color: "text-white",
    details: {
      title: "Prisma ORM",
      subtitle: "Type-Safe Database Access",
      description:
        "Prisma provides type-safe database access with an intuitive query API. It handles database migrations, generates TypeScript types, and ensures data consistency through its schema-first approach.",
      features: [
        "Type-safe database queries",
        "Automatic TypeScript type generation",
        "Migration-based schema management",
        "Duplicate match detection",
        "Atomic database updates",
      ],
      codeExample: "src/core/prisma/prisma.service.ts",
    },
  },
  {
    id: "riot-api",
    label: "Riot API",
    icon: Globe,
    color: "text-hextech",
    details: {
      title: "Riot Games API",
      subtitle: "External Data Source",
      description:
        "The Riot Games API provides match data, player information, and champion statistics. Our system polls Challenger/Grandmaster/Master tier lists to identify new matches and fetches detailed match information for processing.",
      features: [
        "Fetches High-Elo PUUIDs & Match IDs",
        "Retrieves full match details",
        "Rate-limited to respect API constraints",
        "Retry logic for failed requests",
        "Data parsing and transformation",
      ],
      codeExample: "src/core/riot/riot.service.ts",
    },
  },
];

export const getTechById = (id: string): TechData | undefined => {
  return techData.find((tech) => tech.id === id);
};

