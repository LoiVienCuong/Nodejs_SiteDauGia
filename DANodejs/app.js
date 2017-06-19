var express = require('express'),
    handlebars = require('express-handlebars'),
    handlebars_sections = require('express-handlebars-sections'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    path = require('path'),
    wnumb = require('wnumb'),
    handle404 = require('./middle-wares/handle-404'),
    homeController = require('./controllers/homeController'),
   handleLayout = require('./middle-wares/handleLayout'),
   productController = require('./controllers/productController'),
   userController = require('./controllers/userController'),
   helper = require('./fn/helper');
  


var app = express();
app.use(cookieParser('my secret here'));

app.use(morgan('dev'));

app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    partialsDir: 'views/_partials/',
    helpers: {
        section: handlebars_sections(),
        number_format: function (n) {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        },
        ifCond: function(v1, operator, v2, options) {
                 switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '!=':
                        return (v1 != v2) ? options.fn(this) : options.inverse(this);
                    case '!==':
                        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
            }
        },
        json: function(context) {
                return JSON.stringify(context);
        },

        time_format: function(context) {
             var origin = new Date(context);
             var ngayDang = helper.convertNumber(origin.getDate());
             var thangDang = helper.convertNumber(origin.getMonth() + 1);
             var namDang = origin.getFullYear();
             var gioDang = helper.convertNumber(origin.getHours());
             var phutDang = helper.convertNumber(origin.getMinutes());
             var giayDang = helper.convertNumber(origin.getSeconds());
             return gioDang + ":" + phutDang + ":" + giayDang + " " + ngayDang + "/" + thangDang + "/" + namDang;
        }
       

    }
}));
app.set('view engine', 'hbs');

app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(handleLayout);
app.use('/', homeController);
app.use('/product', productController);
app.use('/user', userController);
app.use(handle404);

app.listen(3000);