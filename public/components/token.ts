export const Token = () => {
    const tokens = [
        'pk_b31864ce326b4cb6863e7a66f8bdcdda',
        //'pk_a1feb5ae49654f7cb82aaa9bd1fa3a77', -- INVALID, AWATING MAY RESET
        //'pk_0903b4cef3464a0c9a2de48bbf3e2112', --INVALID, AWATING MAY RESET
        //'pk_b1265aae735b48caad39893e36fb2c5c', -- INVALID, AWATING MAY RESET
        'pk_98e61bb72fd84b7d8b5f19c579fd0d9d'       // WEBKEY, COULD BE GOOD?
    ]

    return tokens[Math.round((Math.random() * tokens.length - 1))]
}

export default Token()