//Find all books in a specific genre

//Query 2
db.books.find({ genre: "Thriller" })

//Find books published after a certain year

//Query 2
db.books.find({ published_year: { $gt: 2017 } })

//Find books by a specific author

//Query 3
db.books.find({ author: "Andy Weir" })

//Update the price of a specific book

//Update 
db.books.updateOne(
    { title: "The Silent Patient" },
    { $set: { price: 17.50 } }
)

//Verify the update
db.books.find({ title: "The Silent Patient" })

// Delete a book by its title

//Delete 1
db.books.deleteOne({ title: "The Da Vinci Code" })

// Verify the deletion
db.books.find({ title: "The Da Vinci Code" })

//Combined Filtering

//Advanced Query 1 (AND)

db.books.find({
    in_stock: true,
    published_year: { $gt: 2010 }
})

//Projection
//Advanced Query 2 (Projection)

db.books.find(
    { genre: "Thriller" },
    { title: 1, author: 1, price: 1, _id: 0 }
)

//Sorting

// Advanced Query 3a (Sort Ascending)
// Sort all books by price, cheapest first
db.books.find().sort({ price: 1 })

// Advanced Query 3b (Sort Descending)
// Sort all books by price, most expensive first
db.books.find().sort({ price: -1 })


//Pagination (Limit and Skip)

// Advanced Query 4a (Page 1)
// First 5 books
db.books.find().limit(5)

// Advanced Query 4b (Page 2)
// Next 5 books (skips the first 5, then limits to the next 5)
db.books.find().skip(5).limit(5)


//Aggregation Pipeline

// Aggregation 1 (Average Price by Genre)
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            average_price: { $avg: "$price" }
        }
    },
    {
        $project: {
            _id: 1, // Keep genre
            average_price: { $round: ["$average_price", 2] } // Round to 2 decimal places
        }
    }
])

// Aggregation 2 (Author with Most Books)
db.books.aggregate([
    {
        $group: {
            _id: "$author",
            book_count: { $sum: 1 }
        }
    },
    {
        $sort: { book_count: -1 } // Sort descending
    },
    {
        $limit: 1 // Only show the top author
    }
])

// Aggregation 3 (Count by Publication Decade)

db.books.aggregate([
    {
        $project: {
            // Calculate the start year of the decade (e.g., 2018 -> 2010)
            decade: {
                $toString: {
                    $multiply: [
                        { $floor: { $divide: ["$published_year", 10] } },
                        10
                    ]
                }
            }
        }
    },
    {
        $group: {
            _id: "$decade",
            book_count: { $sum: 1 }
        }
    },
    {
        $sort: { _id: 1 } // Sort by decade ascending
    }
])

// Indexing

// Index 1 (Single Field Index)
db.books.createIndex({ title: 1 }) // 1 is for ascending order
// Verify the index
db.books.getIndexes()

// Index 2 (Compound Index)
// The index is (author, published_year)
db.books.createIndex({ author: 1, published_year: -1 }) 
// Verify the index
db.books.getIndexes()

//Demonstrate performance improvement with $\text{explain()}$

// Explain 1 (No Index - COLLSCAN expected)
db.books.find({ price: { $lt: 15 } }).explain("executionStats")

// Explain 2 (Single Index - IXSCAN expected)
db.books.find({ title: "Where the Crawdads Sing" }).explain("executionStats")

// Explain 3 (Compound Index - IXSCAN expected)
db.books.find({ author: "Andy Weir", published_year: { $gt: 2000 } }).explain("executionStats")