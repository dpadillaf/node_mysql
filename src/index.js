const express = require( 'express' );
const morgan = require( 'morgan' );
const exphbs = require( 'express-handlebars' );
const path = require( 'path' );

//init
const app = express();

//settings
app.set( 'port', process.env.PORT || 4000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.engine( '.hbs', exphbs( {
    defaultLayout: 'main',
    layoutsDir: path.join( app.get( 'views' ), 'layouts' ),
    partialsDir: path.join( app.get( 'views' ), 'partials' ),
    extname: '.hbs',
    helpers: require( './lib/handlebars' )
} ) );
app.set( 'view engine', '.hbs' );

//middlewares
app.use( morgan( 'dev' ) );
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

//var. globals
app.use( ( req, res, next ) => {
    next();
} );

//routes
app.use( require( './routes/index' ) );
app.use( require( './routes/autenticacion' ) );
app.use( '/links', require( './routes/links' ) );

//publics
app.use( express.static( path.join( __dirname, 'public' ) ) );

//server
app.listen( app.get( 'port' ), () => {
    console.log( `server on port ${ app.get( 'port' ) }` );
} );