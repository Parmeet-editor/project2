export interface SkillTopicLevel {
  level: number;
  title: string;
  bloomCode: 'CU' | 'AP' | 'AS' | 'EV' | 'CR';
  summary: string;
}

export const SKILL_TOPICS_MAP: Record<number, SkillTopicLevel[]> = {
  1: [ // Data Structures & Algorithms
    { level: 1, title: "Array & String Fundamentals", bloomCode: "CU", summary: "Primitive arrays, string manipulation, traversal, Big-O basics" },
    { level: 2, title: "Linear Search & Binary Search", bloomCode: "CU", summary: "Search spaces, lower/upper bounds, sorted arrays" },
    { level: 3, title: "Basic Sorting & Recursion", bloomCode: "AP", summary: "Bubble, selection, insertion sort, recursion bases & call stacks" },
    { level: 4, title: "Singly & Doubly Linked Lists", bloomCode: "AP", summary: "Pointer manipulations, cycle detection, reversals, middle finding" },
    { level: 5, title: "Stacks, Queues & Monotonic Stacks", bloomCode: "AS", summary: "LIFO/FIFO patterns, matching brackets, nearest smaller/greater" },
    { level: 6, title: "Binary Trees & BST Traversals", bloomCode: "AS", summary: "Inorder, preorder, postorder, BFS level-order, LCA algorithms" },
    { level: 7, title: "Heaps & Priority Queues", bloomCode: "EV", summary: "Min-heap/max-heap, top-k elements, interval merging, scheduling" },
    { level: 8, title: "Graph Traversals (BFS/DFS) & Shortest Path", bloomCode: "EV", summary: "Adjacency lists, cycle checks, Dijkstra's algorithm, topological sort" },
    { level: 9, title: "Dynamic Programming (1D & 2D)", bloomCode: "CR", summary: "Memoization, tabulation, knapsack variants, LCS, grid paths" },
    { level: 10, title: "Advanced Tries, Segment Trees & Hard DP", bloomCode: "CR", summary: "Prefix trees, bitmask DP, range queries, competitive problem solving" }
  ],
  2: [ // Object-Oriented Programming
    { level: 1, title: "Classes, Objects & State", bloomCode: "CU", summary: "Class definitions, instantiation, constructors, getters & setters" },
    { level: 2, title: "Encapsulation & Access Modifiers", bloomCode: "CU", summary: "Data hiding, public, private, protected scopes, packages" },
    { level: 3, title: "Inheritance & Code Reusability", bloomCode: "AP", summary: "Single/multi-level inheritance, method overriding, super keyword" },
    { level: 4, title: "Polymorphism (Compile & Runtime)", bloomCode: "AP", summary: "Method overloading, dynamic dispatch, virtual tables, interfaces" },
    { level: 5, title: "Abstraction & Abstract Classes", bloomCode: "AS", summary: "Abstract contracts vs concrete classes, default implementations" },
    { level: 6, title: "SOLID Principles in Practice", bloomCode: "AS", summary: "Single responsibility, open-closed, Liskov, interface segregation, DI" },
    { level: 7, title: "Creational Patterns (Factory, Singleton, Builder)", bloomCode: "EV", summary: "Decoupling object creation, lazy initialization, immutable builders" },
    { level: 8, title: "Structural Patterns (Adapter, Decorator, Facade)", bloomCode: "EV", summary: "Object composition, wrappers, unified system interfaces" },
    { level: 9, title: "Behavioral Patterns (Strategy, Observer, Command)", bloomCode: "CR", summary: "Event-driven decoupling, dynamic algorithm swapping, state machines" },
    { level: 10, title: "Enterprise Domain-Driven Design (DDD)", bloomCode: "CR", summary: "Aggregates, entities, value objects, ubiquitous language architecture" }
  ],
  3: [ // SQL & Databases
    { level: 1, title: "Relational Modeling & Schema Basics", bloomCode: "CU", summary: "Tables, primary keys, foreign keys, data types, nullability" },
    { level: 2, title: "CRUD Operations & Filtering", bloomCode: "CU", summary: "SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, LIMIT" },
    { level: 3, title: "Aggregations & Grouping", bloomCode: "AP", summary: "COUNT, SUM, AVG, GROUP BY, HAVING, distinct clauses" },
    { level: 4, title: "SQL Joins & Set Operations", bloomCode: "AP", summary: "INNER, LEFT, RIGHT, FULL OUTER joins, CROSS JOIN, UNION ALL" },
    { level: 5, title: "Subqueries & Common Table Expressions (CTEs)", bloomCode: "AS", summary: "Correlated subqueries, WITH clauses, recursive CTE structures" },
    { level: 6, title: "Database Normalization (1NF to BCNF)", bloomCode: "AS", summary: "Functional dependencies, eliminating anomalies, denormalization trade-offs" },
    { level: 7, title: "Indexing Strategies & Query Execution Plans", bloomCode: "EV", summary: "B-Tree, hash indexes, composite index order, EXPLAIN ANALYZE" },
    { level: 8, title: "Transactions & ACID Guarantees", bloomCode: "EV", summary: "Isolation levels, dirty reads, optimistic vs pessimistic locking" },
    { level: 9, title: "Stored Procedures, Triggers & Views", bloomCode: "CR", summary: "Server-side stored logic, automated audit triggers, materialized views" },
    { level: 10, title: "Distributed DBs, Sharding & Replication", bloomCode: "CR", summary: "Read replicas, horizontal partitioning, CAP theorem, failover topologies" }
  ],
  4: [ // Cloud Fundamentals (AWS/Azure)
    { level: 1, title: "Cloud Computing Paradigms (IaaS/PaaS/SaaS)", bloomCode: "CU", summary: "Shared responsibility model, elasticity, high availability principles" },
    { level: 2, title: "Cloud Regions, Zones & Latency", bloomCode: "CU", summary: "Global infrastructure, edge locations, redundancy across availability zones" },
    { level: 3, title: "Compute Services (EC2 / Azure VMs)", bloomCode: "AP", summary: "Virtual machine provisioning, sizing, SSH access, auto-scaling groups" },
    { level: 4, title: "Object Storage & File Systems (S3 / Blob)", bloomCode: "AP", summary: "Buckets, lifecycle rules, access policies, CDN distribution" },
    { level: 5, title: "Cloud Networking & Virtual Private Clouds (VPC)", bloomCode: "AS", summary: "Subnets, internet gateways, NAT gateways, route tables, security groups" },
    { level: 6, title: "Identity & Access Management (IAM)", bloomCode: "AS", summary: "Roles, policies, least-privilege principle, MFA, service accounts" },
    { level: 7, title: "Managed Databases & Cache (RDS, Aurora, Redis)", bloomCode: "EV", summary: "Automated backups, multi-AZ deployment, read-replicas, ElastiCache" },
    { level: 8, title: "Serverless Compute (AWS Lambda, Azure Functions)", bloomCode: "EV", summary: "Event triggers, cold starts, API Gateway integration, microservices" },
    { level: 9, title: "Infrastructure as Code (Terraform / CloudFormation)", bloomCode: "CR", summary: "Declarative cloud provisioning, state management, repeatable blueprints" },
    { level: 10, title: "Multi-Cloud Architectures & FinOps", bloomCode: "CR", summary: "Cost optimization, cloud disaster recovery, hybrid connectivity" }
  ],
  5: [ // Operating Systems
    { level: 1, title: "OS Architecture & Kernel vs User Mode", bloomCode: "CU", summary: "Privilege rings, system calls, interrupt handling, BIOS to boot" },
    { level: 2, title: "Process Life Cycle & Process Control Block", bloomCode: "CU", summary: "Process states, fork(), exec(), process scheduling queues" },
    { level: 3, title: "CPU Scheduling Algorithms", bloomCode: "AP", summary: "FCFS, SJF, Round Robin, multi-level feedback queues, preemption" },
    { level: 4, title: "Threads & Concurrency Foundations", bloomCode: "AP", summary: "User vs kernel threads, thread pools, race conditions, atomic operations" },
    { level: 5, title: "Synchronization (Semaphores, Mutexes, Monitors)", bloomCode: "AS", summary: "Critical section problem, Peterson's algorithm, Producer-Consumer pattern" },
    { level: 6, title: "Deadlocks Detection & Prevention", bloomCode: "AS", summary: "Coffman conditions, resource allocation graphs, Banker's algorithm" },
    { level: 7, title: "Memory Management & Paging", bloomCode: "EV", summary: "Logical vs physical addresses, page tables, TLB caches, fragmentation" },
    { level: 8, title: "Virtual Memory & Page Replacement", bloomCode: "EV", summary: "Demand paging, LRU, FIFO, Clock algorithm, thrashing mitigation" },
    { level: 9, title: "File Systems & Storage Management", bloomCode: "CR", summary: "Inodes, directory structures, journaling, RAID levels, disk scheduling" },
    { level: 10, title: "Real-time OS, Virtualization & Containers", bloomCode: "CR", summary: "Hypervisors, Linux cgroups & namespaces, container isolation" }
  ],
  6: [ // Computer Networks
    { level: 1, title: "OSI & TCP/IP Reference Models", bloomCode: "CU", summary: "7 layers vs 4 layers, encapsulation, packet headers, physical media" },
    { level: 2, title: "IP Addressing & Subnetting", bloomCode: "CU", summary: "IPv4 vs IPv6, CIDR notation, netmasks, public vs private subnets" },
    { level: 3, title: "Data Link Layer & MAC Protocols", bloomCode: "AP", summary: "Ethernet frames, ARP protocol, switches, collision domains, VLANs" },
    { level: 4, title: "Routing Fundamentals & Distance Vector / Link State", bloomCode: "AP", summary: "Routing tables, RIP, OSPF, BGP basics, NAT translation" },
    { level: 5, title: "TCP vs UDP & Connection Establishment", bloomCode: "AS", summary: "3-way handshake, 4-way termination, sequence numbers, checksums" },
    { level: 6, title: "TCP Flow Control & Congestion Avoidance", bloomCode: "AS", summary: "Sliding window, Slow Start, AIMD, fast retransmit, congestion window" },
    { level: 7, title: "DNS, DHCP & Application Protocols", bloomCode: "EV", summary: "Hierarchical DNS resolution, lease lifecycles, SMTP, FTP fundamentals" },
    { level: 8, title: "HTTP/1.1 to HTTP/2 and HTTP/3 (QUIC)", bloomCode: "EV", summary: "Multiplexing, head-of-line blocking, TLS handshakes, UDP-based QUIC" },
    { level: 9, title: "Network Security & Firewalls", bloomCode: "CR", summary: "Stateful firewalls, VPNs, SSL/TLS certificates, DDoS defenses" },
    { level: 10, title: "Software-Defined Networking (SDN) & CDN Topologies", bloomCode: "CR", summary: "Control vs data plane, edge routing, Anycast DNS, reverse proxies" }
  ],
  7: [ // Aptitude & Logical Reasoning
    { level: 1, title: "Number Systems & Divisibility Rules", bloomCode: "CU", summary: "Factors, primes, remainders, modular arithmetic basics" },
    { level: 2, title: "Percentages, Ratios & Proportions", bloomCode: "CU", summary: "Percentage changes, partnership problems, mixture & alligation" },
    { level: 3, title: "Profit, Loss & Simple/Compound Interest", bloomCode: "AP", summary: "Discounts, marked price, depreciation, compounding cycles" },
    { level: 4, title: "Time, Speed & Distance", bloomCode: "AP", summary: "Relative speed, trains, boats and streams, circular tracks" },
    { level: 5, title: "Time & Work, Pipes & Cisterns", bloomCode: "AS", summary: "Efficiency ratios, alternate hour problems, negative work leaks" },
    { level: 6, title: "Permutations, Combinations & Probability", bloomCode: "AS", summary: "Factorials, arrangement constraints, conditional probability" },
    { level: 7, title: "Blood Relations, Direction Sense & Coding-Decoding", bloomCode: "EV", summary: "Family trees, compass directions, alphanumeric deciphering" },
    { level: 8, title: "Syllogisms, Seating Arrangements & Puzzles", bloomCode: "EV", summary: "Venn logic, circular & linear arrangements, multi-variable matching" },
    { level: 9, title: "Data Interpretation (Bar, Pie, Radar Charts)", bloomCode: "CR", summary: "Table analysis, cross-series percentage estimation under time limits" },
    { level: 10, title: "Critical Thinking & Assumption Evaluation", bloomCode: "CR", summary: "Strengthening/weakening arguments, statement & course of action" }
  ],
  8: [ // Communication & Behavioral
    { level: 1, title: "Active Listening & Paraphrasing", bloomCode: "CU", summary: "Attentive posture, non-verbal cues, clarifying questions" },
    { level: 2, title: "Professional Email & Written Etiquette", bloomCode: "CU", summary: "Subject lines, clarity, tone modulation, follow-up protocols" },
    { level: 3, title: "Structured Self-Introduction & Elevator Pitch", bloomCode: "AP", summary: "30-second and 2-minute elevator pitches customized for tech roles" },
    { level: 4, title: "STAR Method (Situation, Task, Action, Result)", bloomCode: "AP", summary: "Quantifiable storytelling for behavioral interview scenarios" },
    { level: 5, title: "Navigating Conflict & Difficult Conversations", bloomCode: "AS", summary: "Non-violent communication, empathy, depersonalizing critique" },
    { level: 6, title: "Team Collaboration & Cross-Functional Dialogue", bloomCode: "AS", summary: "Bridging engineering, design, and business stakeholder jargon" },
    { level: 7, title: "Technical Presentation & Slide Storyboarding", bloomCode: "EV", summary: "Simplifying complex architectures for diverse audiences" },
    { level: 8, title: "Negotiation, Feedback Reception & Resilience", bloomCode: "EV", summary: "Receiving developmental feedback, compensation discussions" },
    { level: 9, title: "Leadership Communication & Mentorship", bloomCode: "CR", summary: "Inspiring peers, leading meetings, driving consensus decisions" },
    { level: 10, title: "Executive Presence & Global Client Relations", bloomCode: "CR", summary: "Cross-cultural sensitivity, boardroom confidence, trusted advisor posture" }
  ],
  9: [ // Web Development Basics
    { level: 1, title: "Semantic HTML5 & Document Structure", bloomCode: "CU", summary: "Tags, accessibility landmarks, forms, SEO meta attributes" },
    { level: 2, title: "CSS Box Model & Styling Fundamentals", bloomCode: "CU", summary: "Margin, border, padding, units, cascade, specificity rules" },
    { level: 3, title: "Responsive Layouts (Flexbox & CSS Grid)", bloomCode: "AP", summary: "Media queries, 12-column grids, alignment axes, mobile-first design" },
    { level: 4, title: "JavaScript ES6+ Syntax & DOM Manipulation", bloomCode: "AP", summary: "let/const, arrow functions, destructuring, event listeners, bubbling" },
    { level: 5, title: "Async JavaScript, Promises & Fetch API", bloomCode: "AS", summary: "Event loop, macro/microtasks, async/await, error handling" },
    { level: 6, title: "React Core Concepts (JSX, Props & State)", bloomCode: "AS", summary: "Component tree, virtual DOM, reconciliation, unidirectional data flow" },
    { level: 7, title: "React Hooks (useState, useEffect, useMemo)", bloomCode: "EV", summary: "Hook lifecycle, dependency arrays, custom hooks, ref management" },
    { level: 8, title: "State Management & Client Routing", bloomCode: "EV", summary: "Context API, external stores, React Router navigation & params" },
    { level: 9, title: "API Integration, WebSockets & Authentication", bloomCode: "CR", summary: "JWT headers, CORS, RESTful patterns, optimistic UI updates" },
    { level: 10, title: "Web Performance & Core Web Vitals", bloomCode: "CR", summary: "Code splitting, lazy loading, LCP/FID/CLS optimization, SSR/SSG" }
  ],
  10: [ // System Design (Intro)
    { level: 1, title: "Client-Server Architecture Fundamentals", bloomCode: "CU", summary: "Requests, responses, statelessness, HTTP status codes" },
    { level: 2, title: "Vertical vs Horizontal Scaling", bloomCode: "CU", summary: "Scale-up limits, scale-out benefits, stateless app servers" },
    { level: 3, title: "Load Balancing Strategies", bloomCode: "AP", summary: "Round-robin, least connections, IP hash, Layer 4 vs Layer 7" },
    { level: 4, title: "Caching Mechanisms & Invalidation", bloomCode: "AP", summary: "Client, CDN, Redis cache, write-through, write-back, LRU eviction" },
    { level: 5, title: "Database Scaling (Sharding & Replication)", bloomCode: "AS", summary: "Read-write separation, consistent hashing, shard key selection" },
    { level: 6, title: "Asynchronous Messaging & Message Queues", bloomCode: "AS", summary: "Pub/Sub models, RabbitMQ, Kafka, decoupling high-throughput producers" },
    { level: 7, title: "Storage Types (SQL, NoSQL, Object Storage)", bloomCode: "EV", summary: "Document, key-value, graph databases vs relational schema trade-offs" },
    { level: 8, title: "CAP Theorem, PACELC & Consistency Models", bloomCode: "EV", summary: "Strong vs eventual consistency, network partition strategies" },
    { level: 9, title: "High-Availability System Design (URL Shortener)", bloomCode: "CR", summary: "Back-of-the-envelope estimations, schema, API endpoints, rate limiting" },
    { level: 10, title: "Large-Scale Feed Architecture (Twitter/Instagram)", bloomCode: "CR", summary: "Fanout-on-write vs fanout-on-read, timeline caching, hybrid pipelines" }
  ],
  11: [ // Git & Version Control
    { level: 1, title: "Version Control Concepts & Local Repo Setup", bloomCode: "CU", summary: "git init, repository tracking, working directory vs staging area" },
    { level: 2, title: "Staging, Commits & Status Inspection", bloomCode: "CU", summary: "git add, git commit -m, git status, git log, diffing changes" },
    { level: 3, title: "Branching & Switching", bloomCode: "AP", summary: "git branch, git checkout / switch, feature branch strategies" },
    { level: 4, title: "Merging & Conflict Resolution", bloomCode: "AP", summary: "Fast-forward merges, 3-way merge commits, resolving merge conflicts" },
    { level: 5, title: "Remote Repositories (GitHub/GitLab)", bloomCode: "AS", summary: "git remote add, fetch, pull, push, upstream tracking branches" },
    { level: 6, title: "Undoing Changes (Revert, Reset & Stash)", bloomCode: "AS", summary: "git stash, git restore, soft vs hard reset, safe git revert" },
    { level: 7, title: "Rebasing vs Merging", bloomCode: "EV", summary: "Interactive rebase (squash, fixup), linear commit histories" },
    { level: 8, title: "Pull Requests & Code Review Workflows", bloomCode: "EV", summary: "PR templates, branch protection rules, review comments, draft PRs" },
    { level: 9, title: "Git Hooks & Automations", bloomCode: "CR", summary: "Pre-commit hooks, lint-staged, commit message formatting linters" },
    { level: 10, title: "Advanced Git (Bisect, Cherry-Pick & Submodules)", bloomCode: "CR", summary: "git bisect debugging, surgical cherry-picking, reflog recovery" }
  ],
  12: [ // Generative AI Basics
    { level: 1, title: "AI, Machine Learning & Deep Learning Overview", bloomCode: "CU", summary: "Supervised vs unsupervised learning, neural network intuition" },
    { level: 2, title: "Transformer Architecture & Attention Intuition", bloomCode: "CU", summary: "Self-attention mechanism, encoders, decoders, sequence prediction" },
    { level: 3, title: "Large Language Models (LLMs) & Tokenization", bloomCode: "AP", summary: "Tokens, context windows, vocabulary embeddings, next-token probability" },
    { level: 4, title: "Prompt Engineering & Few-Shot Learning", bloomCode: "AP", summary: "System prompts, zero-shot vs few-shot examples, role conditioning" },
    { level: 5, title: "Chain-of-Thought & Reasoning Prompts", bloomCode: "AS", summary: "Step-by-step reasoning, self-consistency, structured JSON outputs" },
    { level: 6, title: "Retrieval-Augmented Generation (RAG) Architecture", bloomCode: "AS", summary: "Vector databases, chunking strategies, cosine similarity retrieval" },
    { level: 7, title: "Embeddings & Semantic Search", bloomCode: "EV", summary: "Dense vectors, high-dimensional space, hybrid BM25 + vector search" },
    { level: 8, title: "Model Temperature, Top-P & Hallucination Mitigation", bloomCode: "EV", summary: "Sampling hyperparameters, grounding strategies, citation verifications" },
    { level: 9, title: "AI Agents & Function/Tool Calling", bloomCode: "CR", summary: "Tool execution loops, ReAct framework, schema-defined API triggers" },
    { level: 10, title: "Fine-Tuning (LoRA, QLoRA) & AI Safety/Ethics", bloomCode: "CR", summary: "Parameter-efficient fine-tuning, alignment (RLHF), safety guardrails" }
  ]
};
