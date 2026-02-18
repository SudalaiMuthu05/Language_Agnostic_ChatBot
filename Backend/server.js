// // // // // import express from "express";
// // // // // import cors from "cors";
// // // // // import { MongoClient } from "mongodb";
// // // // // import dashboardRoute from "./routes/dashboard.js";

// // // // // require('dotenv').config();
// // // // // console.log('MONGO_URI=', !!process.env.MONGO_URI);

// // // // // const app = express();
// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // // --------------------
// // // // // // MongoDB Connection
// // // // // // --------------------
// // // // // const MONGO_URL = "mongodb+srv://sara:6pathiyam@cluster0.l1g9jjw.mongodb.net/?appName=Cluster0";
// // // // // const DB_NAME = "n8n1";
// // // // // const COLLECTION_NAME = "n8n_chat_histories";

// // // // // let collection;

// // // // // async function connectDB() {
// // // // //   try {
// // // // //     const client = new MongoClient(MONGO_URL);
// // // // //     await client.connect();
// // // // //     console.log("✅ MongoDB Connected");

// // // // //     const db = client.db(DB_NAME);
// // // // //     collection = db.collection(COLLECTION_NAME);

// // // // //     app.use("/api/dashboard", dashboardRoute(collection));

// // // // //     app.listen(5000, () => {
// // // // //       console.log("🚀 Server running on port 5000");
// // // // //     });

// // // // //   } catch (err) {
// // // // //     console.error("❌ MongoDB Connection Error:", err);
// // // // //   }
// // // // // }

// // // // // connectDB();

// // // // // // routes/dashboard.js
// // // // // import express from "express";
// // // // // import dotenv from "dotenv";
// // // // // dotenv.config();


// // // // // /**
// // // // //  * Expects `collection` (MongoDB collection) to be passed in.
// // // // //  * Returns a router: GET /stats
// // // // //  */
// // // // // export default function dashboardRoute(collection) {
// // // // //   const router = express.Router();

// // // // //   router.get("/stats", async (req, res) => {
// // // // //     try {
// // // // //       // Single aggregation using $facet to minimize round trips
// // // // //       const pipeline = [
// // // // //         {
// // // // //           $facet: {
// // // // //             totals: [
// // // // //               {
// // // // //                 $group: {
// // // // //                   _id: null,
// // // // //                   total: { $sum: 1 },
// // // // //                   // escalated boolean field expected in docs
// // // // //                   escalatedCount: { $sum: { $cond: ["$escalated", 1, 0] } },
// // // // //                   // ai_responses counted if source/sender/role indicate AI
// // // // //                   ai_responses: {
// // // // //                     $sum: {
// // // // //                       $cond: [
// // // // //                         {
// // // // //                           $or: [
// // // // //                             { $eq: ["$source", "ai"] },
// // // // //                             { $eq: ["$sender", "bot"] },
// // // // //                             { $eq: ["$role", "assistant"] }
// // // // //                           ]
// // // // //                         },
// // // // //                         1,
// // // // //                         0
// // // // //                       ]
// // // // //                     }
// // // // //                   }
// // // // //                 }
// // // // //               }
// // // // //             ],
// // // // //             languages: [
// // // // //               {
// // // // //                 $group: {
// // // // //                   _id: { $ifNull: ["$language", "Others"] },
// // // // //                   count: { $sum: 1 }
// // // // //                 }
// // // // //               },
// // // // //               { $sort: { count: -1 } }
// // // // //             ],
// // // // //             categories: [
// // // // //               {
// // // // //                 $group: {
// // // // //                   _id: { $ifNull: ["$category", "General"] },
// // // // //                   count: { $sum: 1 }
// // // // //                 }
// // // // //               },
// // // // //               { $sort: { count: -1 } }
// // // // //             ],
// // // // //             topEscalationExamples: [
// // // // //               // optional: return some example escalations to help debug
// // // // //               { $match: { escalated: true } },
// // // // //               { $limit: 5 },
// // // // //               { $project: { _id: 0, userId: 1, message: 1, reply: 1, createdAt: 1 } }
// // // // //             ]
// // // // //           }
// // // // //         }
// // // // //       ];

// // // // //       const aggResult = await collection.aggregate(pipeline).toArray();
// // // // //       const facet = (aggResult && aggResult[0]) || {};

// // // // //       const totals = (facet.totals && facet.totals[0]) || { total: 0, escalatedCount: 0, ai_responses: 0 };
// // // // //       const totalQueries = totals.total || 0;
// // // // //       const humanEscalations = totals.escalatedCount || 0;
// // // // //       const aiResponses = totals.ai_responses || 0;

// // // // //       // HER formula: (Total Escalated Queries / Total AI Queries) × 100
// // // // //       const HER = aiResponses > 0 ? ((humanEscalations / aiResponses) * 100) : 0;
// // // // //       const HERstr = Number(HER).toFixed(2);

// // // // //       // Accuracy: example formula (you can adjust)
// // // // //       const accuracy = aiResponses > 0 ? (((aiResponses - humanEscalations) / aiResponses) * 100) : 0;
// // // // //       const accuracyStr = Number(accuracy).toFixed(2);

// // // // //       // Compose languages as percentages
// // // // //       const languages = (facet.languages || []).map(l => {
// // // // //         const pct = totalQueries > 0 ? (l.count / totalQueries) * 100 : 0;
// // // // //         return { language: l._id, count: l.count, percentage: Number(pct.toFixed(2)) };
// // // // //       });

// // // // //       const categories = (facet.categories || []).map((c, idx) => ({
// // // // //         category: c._id,
// // // // //         count: c.count,
// // // // //         // deterministic-ish color palette by index
// // // // //         color: ["#6366f1","#7c3aed","#059669","#f59e0b","#14b8a6","#f97316","#ef4444"][idx % 7]
// // // // //       }));

// // // // //       res.json({
// // // // //         totalUsers: 0,               // optional: add users collection later
// // // // //         totalQueries,
// // // // //         ai_responses: aiResponses,
// // // // //         human_escalations: humanEscalations,
// // // // //         HER: Number(HERstr),        // human escalation ratio %
// // // // //         accuracy: Number(accuracyStr),
// // // // //         languages,
// // // // //         categories,
// // // // //         examples: facet.topEscalationExamples || []
// // // // //       });

// // // // //     } catch (err) {
// // // // //       console.error("Dashboard route error:", err);
// // // // //       res.status(500).json({ error: "Failed to fetch stats" });
// // // // //     }
// // // // //   });

// // // // //   return router;
// // // // // }


// // // // console.log('MONGO_URI (masked):', process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:(.*)@/, ':<pwd>@') : 'MONGO_URI not set');


// // // // // backend/server.js
// // // // import express from "express";
// // // // import cors from "cors";
// // // // import { MongoClient } from "mongodb";
// // // // import dashboardRoute from "./routes/dashboard.js";
// // // // import dotenv from "dotenv";

// // // // dotenv.config();

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // Read from .env first (recommended). If empty, fallback to placeholder.
// // // // const MONGO_URL = 
// // // //   process.env.MONGO_URL ||
// // // //   // <-- replace the host portion below with your Atlas non-SRV hosts if you paste here
// // // //   "mongodb+srv://sara:sarazz1@cluster0.lmrqnu8.mongodb.net/?appName=Cluster0";
// // // // const DB_NAME = process.env.DB_NAME || "n8n";
// // // // const COLLECTION_NAME = process.env.COLLECTION_NAME || "n8n_chat_histories";

// // // // let collection = null;

// // // // async function connectDB() {
// // // //   console.log("🚀 server.js starting...");
// // // //   console.log("Using DB_NAME:", DB_NAME, "COLLECTION_NAME:", COLLECTION_NAME);

// // // //   if (!MONGO_URL || MONGO_URL.includes("<USER>")) {
// // // //     console.warn("⚠ MONGO_URL not set or still placeholder. Starting in mock mode.");
// // // //     startWithMock();
// // // //     return;
// // // //   }

// // // //   try {
// // // //     console.log("⏳ connecting to MongoDB (non-SRV) ...");
// // // //     const client = new MongoClient(MONGO_URL, {
// // // //       connectTimeoutMS: 20000,
// // // //       serverSelectionTimeoutMS: 20000
// // // //     });
// // // //     await client.connect();
// // // //     console.log("✅ MongoDB connected");

// // // //     const db = client.db(DB_NAME);
// // // //     collection = db.collection(COLLECTION_NAME);

// // // //     // mount routes
// // // //     app.use("/api/dashboard", dashboardRoute(collection));

// // // //     app.listen(5000, () => {
// // // //       console.log("🚀 Server running on http://localhost:5000");
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("❌ MongoDB Connection Error:", err && err.message ? err.message : err);
// // // //     console.warn("⚠ starting with in-memory mock data for development.");
// // // //     startWithMock();
// // // //   }
// // // // }

// // // // function startWithMock() {
// // // //   // minimal mock data shaped like your real documents
// // // //   const mockDocs = [
// // // //     {
// // // //       sessionId: "sess_1",
// // // //       messages: [
// // // //         { type: "human", data: "How to apply for scholarship?", createdAt: new Date().toISOString() },
// // // //         { type: "ai", data: "Please check the admissions page", createdAt: new Date().toISOString() }
// // // //       ]
// // // //     },
// // // //     {
// // // //       sessionId: "sess_2",
// // // //       messages: [
// // // //         { type: "human", data: "When are the exams?", createdAt: new Date().toISOString() },
// // // //         { type: "ai", data: "Exams are on the portal", createdAt: new Date().toISOString() }
// // // //       ]
// // // //     },
// // // //     {
// // // //       sessionId: "sess_3",
// // // //       messages: [
// // // //         { type: "human", data: "Hostel rules", createdAt: new Date().toISOString() },
// // // //         { type: "ai", data: "information is not available, contact admin", createdAt: new Date().toISOString() }
// // // //       ]
// // // //     }
// // // //   ];

// // // //   collection = {
// // // //     find: async (q = {}) => ({ toArray: async () => mockDocs }),
// // // //     distinct: async (field) => {
// // // //       if (field === "sessionId") return [...new Set(mockDocs.map((d) => d.sessionId))];
// // // //       return [];
// // // //     },
// // // //     aggregate: undefined // intentionally undefined so dashboard uses fallback code path
// // // //   };

// // // //   app.use("/api/dashboard", dashboardRoute(collection));

// // // //   app.listen(5000, () => {
// // // //     console.log("🚀 Server running on http://localhost:5000 (mock mode)");
// // // //   });
// // // // }

// // // // connectDB();

// // // // server.js
// // // import express from "express";
// // // import cors from "cors";
// // // import dotenv from "dotenv";
// // // import { MongoClient } from "mongodb";

// // // dotenv.config();

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // // Environment variables
// // // const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://sara:sarazz1@cluster0.lmrqnu8.mongodb.net/?appName=Cluster0";
// // // const DB_NAME = process.env.DB_NAME || "n8n";
// // // const COLLECTION_NAME = process.env.COLLECTION_NAME || "n8n_chat_histories";
// // // const PORT = process.env.PORT || 5000;

// // // let collection;

// // // // --------------------
// // // // MongoDB Connection
// // // // --------------------
// // // async function connectDB() {
// // //   try {
// // //     if (!MONGO_URL || MONGO_URL.includes("xxxx")) {
// // //       console.error("❌ MONGO_URL missing or incorrect in .env");
// // //       process.exit(1);
// // //     }

// // //     const client = new MongoClient(MONGO_URL);
// // //     await client.connect();
// // //     console.log("✅ MongoDB Connected");

// // //     const db = client.db(DB_NAME);
// // //     collection = db.collection(COLLECTION_NAME);

// // //     // Import route AFTER DB is ready
// // //     const dashboardRoute = (await import("./routes/dashboard.js")).default;
// // //     app.use("/api/dashboard", dashboardRoute(collection));

// // //     app.listen(PORT, () =>
// // //       console.log(🚀 Server running on http://localhost:${PORT})
// // //     );
// // //   } catch (err) {
// // //     console.error("❌ MongoDB Connection Error:", err);
// // //     process.exit(1);
// // //   }
// // // }

// // // connectDB();

// // // server.js
// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import { MongoClient } from "mongodb";

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Environment variables (accept either MONGO_URI or MONGO_URL)
// // const MONGO_URI =
// //   process.env.MONGO_URI ||
// //   process.env.MONGO_URL ||
// //   "mongodb+srv://sara:sarazz1@cluster0.lmrqnu8.mongodb.net/raj_sahayak?retryWrites=true&w=majority&appName=Cluster0";
// // const DB_NAME = process.env.DB_NAME || "n8n";
// // const COLLECTION_NAME = process.env.COLLECTION_NAME || "n8n_chat_histories";
// // const PORT = process.env.PORT || 5000;

// // let collection;

// // // --------------------
// // // MongoDB Connection
// // // --------------------
// // async function connectDB() {
// //   try {
// //     if (!MONGO_URI || MONGO_URI.includes("xxxx")) {
// //       console.error("❌ MONGO_URI missing or incorrect in environment");
// //       process.exit(1);
// //     }

// //     // Masked log so you can verify the value without exposing password
// //     console.log(
// //       "MONGO_URI (masked):",
// //       MONGO_URI.replace(/:\/\/(.*?):(.*?)@/, "://<user>:<pwd>@")
// //     );

// //     const client = new MongoClient(MONGO_URI, {
// //       // modern driver options (no harm keeping them)
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });

// //     console.log("⏳ connecting to MongoDB ...");
// //     await client.connect();
// //     console.log("✅ MongoDB Connected");

// //     const db = client.db(DB_NAME);
// //     collection = db.collection(COLLECTION_NAME);

// //     // Import route AFTER DB is ready
// //     const module = await import("./routes/dashboard.js");
// //     const dashboardRoute = module.default || module.router || module;
// //     app.use("/api/dashboard", dashboardRoute(collection));

// //     app.listen(PORT, () =>
// //       console.log(`🚀 Server running on http://localhost:${PORT}`)
// //     );
// //   } catch (err) {
// //     console.error("❌ MongoDB Connection Error:", err.message || err);
// //     // if you want to fall back to mock mode instead of exiting, replace the exit with fallback logic
// //     process.exit(1);
// //   }
// // }

// // connectDB();


// // server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { MongoClient } from "mongodb";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Environment variables
// const MONGO_URI =
//   process.env.MONGO_URI ||
//   process.env.MONGO_URL ||
//   "mongodb+srv://sara:sarazz1@cluster0.lmrqnu8.mongodb.net/raj_sahayak?retryWrites=true&w=majority&appName=Cluster0";

// const DB_NAME = process.env.DB_NAME || "n8n";
// const COLLECTION_NAME = process.env.COLLECTION_NAME || "n8n_chat_histories";
// const PORT = process.env.PORT || 5000;

// let collection;

// // --------------------
// // MongoDB Connection (driver v5 compatible)
// // --------------------
// async function connectDB() {
//   try {
//     console.log(
//       "MONGO_URI (masked):",
//       MONGO_URI.replace(/:\/\/(.*?):(.*?)@/, "://<user>:<pwd>@")
//     );

//     const client = new MongoClient(MONGO_URI); // ← FIXED (no old options)

//     console.log("⏳ connecting to MongoDB ...");
//     await client.connect();
//     console.log("✅ MongoDB Connected");

//     const db = client.db(DB_NAME);
//     collection = db.collection(COLLECTION_NAME);

//     const module = await import("./routes/dashboard.js");
//     const dashboardRoute = module.default || module.router || module;

//     app.use("/api/dashboard", dashboardRoute(collection));

//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     );
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err.message || err);
//     process.exit(1);
//   }
// }

// connectDB();
  






// import express from "express";
// import cors from "cors";
// import { MongoClient } from "mongodb";
// import dashboardRoute from "./routes/dashboard.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // --------------------
// // MongoDB Connection
// // --------------------
// // Try Atlas first, fallback to local MongoDB
// const MONGO_ATLAS_URL = "mongodb+srv://sara:6pathiyam@cluster0.l1g9jjw.mongodb.net/?appName=Cluster0";
// const MONGO_LOCAL_URL = "mongodb://localhost:27017";
// const DB_NAME = "n8n1";
// const COLLECTION_NAME = "n8n_chat_histories";

// let collection;

// async function connectDB() {
//   let mongoURL = MONGO_ATLAS_URL;
//   const maxRetries = 3;
//   let retries = 0;

//   while (retries < maxRetries) {
//     try {
//       console.log(📡 Attempting to connect to MongoDB (${retries + 1}/${maxRetries})...);
//       const client = new MongoClient(mongoURL, {
//         serverSelectionTimeoutMS: 5000,
//         socketTimeoutMS: 5000,
//       });
      
//       await client.connect();
//       console.log(✅ MongoDB Connected (${mongoURL === MONGO_ATLAS_URL ? 'Atlas' : 'Local'}));

//       const db = client.db(DB_NAME);
//       collection = db.collection(COLLECTION_NAME);

//       app.use("/api/dashboard", dashboardRoute(collection));

//       app.listen(5000, () => {
//         console.log("🚀 Server running on port 5000");
//       });

//       return; // Success, exit function

//     } catch (err) {
//       retries++;
//       console.error(❌ Connection attempt ${retries} failed:, err.message);

//       // If Atlas fails and we haven't tried local yet, switch to local
//       if (mongoURL === MONGO_ATLAS_URL && retries < maxRetries) {
//         console.log("⚠  Atlas connection failed. Trying local MongoDB...");
//         mongoURL = MONGO_LOCAL_URL;
//         retries = 0; // Reset retry counter for local
//       } else if (retries >= maxRetries) {
//         console.error("\n❌ MongoDB Connection Failed!");
//         console.error("\n💡 SOLUTIONS:");
//         console.error("1. Check your internet connection");
//         console.error("2. Add your IP to MongoDB Atlas whitelist (https://cloud.mongodb.com)");
//         console.error("3. Verify credentials: sara / 6pathiyam");
//         console.error("4. Start local MongoDB: mongod --dbpath C:\\path\\to\\data");
//         console.error("5. Check MongoDB status at https://cloud.mongodb.com/v2/");
//         console.error("\n🚀 Server will start without DB connection in 5 seconds...\n");
        
//         // Start server anyway without DB
//         setTimeout(() => {
//           app.listen(5000, () => {
//             console.log("🚀 Server running on port 5000 (without database)");
//           });
//         }, 5000);
//         return;
//       }
//     }
//   }
// }

// connectDB();






import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dashboardRoute from "./routes/dashboard.js";

const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// MongoDB Connection
// --------------------
// Try Atlas first, fallback to local MongoDB
const MONGO_ATLAS_URL = "mongodb+srv://sara:6pathiyam@cluster0.l1g9jjw.mongodb.net/?appName=Cluster0";
const MONGO_LOCAL_URL = "mongodb://localhost:27017";
const DB_NAME = "n8n1";
const COLLECTION_NAME = "n8n_chat_histories";

let collection;

async function connectDB() {
  let mongoURL = MONGO_ATLAS_URL;
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log(`📡 Attempting to connect to MongoDB (${retries + 1}/${maxRetries})...`);
      const client = new MongoClient(mongoURL, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 5000,
      });
      
      await client.connect();
      console.log(`✅ MongoDB Connected (${mongoURL === MONGO_ATLAS_URL ? 'Atlas' : 'Local'})`);

      const db = client.db(DB_NAME);
      collection = db.collection(COLLECTION_NAME);

      app.use("/api/dashboard", dashboardRoute(collection));

      app.listen(5000, () => {
        console.log("🚀 Server running on port 5000");
      });

      return; // Success, exit function

    } catch (err) {
      retries++;
      console.error(`❌ Connection attempt ${retries} failed:`, err.message);

      // If Atlas fails and we haven't tried local yet, switch to local
      if (mongoURL === MONGO_ATLAS_URL && retries < maxRetries) {
        console.log("⚠️ Atlas connection failed. Trying local MongoDB...");
        mongoURL = MONGO_LOCAL_URL;
        retries = 0; // Reset retry counter for local
      } else if (retries >= maxRetries) {
        console.error("\n❌ MongoDB Connection Failed!");
        console.error("\n💡 SOLUTIONS:");
        console.error("1. Check your internet connection");
        console.error("2. Add your IP to MongoDB Atlas whitelist (https://cloud.mongodb.com)");
        console.error("3. Verify credentials: sara / 6pathiyam");
        console.error("4. Start local MongoDB: mongod --dbpath C:\\path\\to\\data");
        console.error("5. Check MongoDB status at https://cloud.mongodb.com/v2/");
        console.error("\n🚀 Server will start without DB connection in 5 seconds...\n");
        
        // Start server anyway without DB
        setTimeout(() => {
          app.listen(5000, () => {
            console.log("🚀 Server running on port 5000 (without database)");
          });
        }, 5000);
        return;
      }
    }
  }
}

connectDB();