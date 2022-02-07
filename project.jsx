class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>{this.props.text}</h1>
        )
    }
}
Header.defaultProps = { text: "Header" };

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let btnQuoteClass =
            this.props.progress == 0 ?
                "btn btn-primary" :
                this.props.progress == 1 ?
                    "btn btn-secondary" :
                    "btn btn-danger";
        let btnQuoteText =
            this.props.progress == 0 ?
                "Get Quote" :
                this.props.progress == 1 ?
                    "Getting Quote..." :
                    "Error, try again";
        let btnQuoteDisabled =
            this.props.progress == 1 ?
                true :
                false;

        let btnTwitterLinkHref =
            "https://twitter.com/intent/tweet?" +
            encodeURIComponent(
                "text=Quote'" +
                this.props.quoteText +
                "', by " +
                this.props.quoteAuthor);

        let animate =
            this.props.progress == 1 ?
                "animate__animated animate__backOutUp" :
                "animate__animated animate__bounceInDown";


        return (
            <div id="quote-box">
                <div className="row">
                    <div className="col-xs-12">
                        <h2 id="text" className={animate}>"{this.props.quoteText}"</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h3 id="author" className={animate}><i>-{this.props.quoteAuthor}-</i></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <a href={btnTwitterLinkHref} target="_top" id="tweet-quote" className="btn btn-primary">Tweet Quote</a>
                        <button id="new-quote"
                            className={btnQuoteClass}
                            disabled={btnQuoteDisabled}
                            onClick={this.props.getNewQuote}>{btnQuoteText}</button>
                    </div>
                </div>
            </div>
        )
    }
}

class MainView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="quote-box" className="container-fluid text-center">
                <Header text="Random Quote Machine" />
                <QuoteBox
                    progress={this.props.progress}
                    quoteText={this.props.quoteText}
                    quoteAuthor={this.props.quoteAuthor}
                    getNewQuote={this.props.getNewQuote}
                />
            </div>
        )
    }
}


const fouxQuoteDatabase = [
    {
        q: "Quote 1",
        a: "Author 1"
    },
    {
        q: "Quote 2",
        a: "Author 2"
    },
    {
        q: "Quote 3",
        a: "Author 3"
    },
    {
        q: "Quote 4",
        a: "Author 4"
    },
    {
        q: "Quote 5",
        a: "Author 5"
    },
    {
        q: "Quote 6",
        a: "Author 6"
    }
];
class QuoteMachineApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteText: 'Some Quote',
            quoteAuthor: 'Some Quote Author',
            progress: 0
        }
        this.getNewQuote = this.getNewQuote.bind(this);
    }

    // local method
    handleQuoteAPIRequest = () => {
        // simulate API call
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                // simulate an error happening
                let randomPotentialError = Math.random() <= .15;
                if (!randomPotentialError) {
                    // success
                    resolve(
                        fouxQuoteDatabase[
                        Math.floor(
                            Math.random() * fouxQuoteDatabase.length
                        )
                        ]
                    );
                } else {
                    // error
                    reject("error");
                }

            }, Math.random() * 1000);
        });
    }

    getNewQuote = () => {
        // update state the call is in progress
        // -1 = error
        // 0 = success
        // 1 = in progress
        this.setState((prevState) => (
            Object.assign({}, prevState, { progress: 1 })
        ));

        let quotePromise = this.handleQuoteAPIRequest();
        quotePromise.then(
            (data) => {
                console.log(data);
                // update the state
                this.setState((prevState) => (
                    Object.assign({}, prevState, {
                        quoteText: data.q,
                        quoteAuthor: data.a,
                        progress: 0
                    })
                ));
            },
            (err) => {
                console.log(err);
                // update the state
                this.setState((prevState) => (
                    Object.assign({}, prevState, {
                        quoteText: "Sometimes errors just, happen.",
                        quoteAuthor: "The creator",
                        progress: -1
                    })
                ));
            }
        );
    }

    // first call
    componentDidMount = () => {
        this.getNewQuote();//
    };

    render() {
        let style = {
            backgroundColor: "red"
        };
        return (
            <MainView
                style={style}
                progress={this.state.progress}
                quoteText={this.state.quoteText}
                quoteAuthor={this.state.quoteAuthor}
                getNewQuote={this.getNewQuote}
            />
        )
    }
}

ReactDOM.render(
    <QuoteMachineApp />,
    document.getElementById("react-app")
);