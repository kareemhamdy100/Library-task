const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BookModel = sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        availableQuantity: {
            type: DataTypes.INTEGER,
            validate: { min: 0 },
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        shelfLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        indexes: [
            { fields: [sequelize.fn('LOWER', sequelize.col('author'))] },
        ],
    });

    const bookModelCreateFullTextSearchField = async () => {
        const addColumnCommand = `
        DO $$ 
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'books' AND column_name = 'fullTextSearch') THEN
            ALTER TABLE "books"
            ADD COLUMN "fullTextSearch" tsvector 
            generated always as (to_tsvector('simple', title) || to_tsvector('simple', author))
            stored;
          END IF;
        END $$;
      `;

        const addIndexCommand = 'CREATE INDEX  IF NOT EXISTS books_fullTextSearch_gin ON "books" USING gin("fullTextSearch");';

        await sequelize.query(addColumnCommand);
        await sequelize.query(addIndexCommand);
    };
    return { BookModel, bookModelCreateFullTextSearchField };
};
