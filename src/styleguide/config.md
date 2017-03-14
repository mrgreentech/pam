# Styleguide options

### Head

    meta(name='viewport', content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')

    <link rel="icon" href="favicon.png">
    link(rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css')
    <link rel="stylesheet" href="styleguide.css">
    <link rel="stylesheet" href="pam-responsive.css">

    style body.sg { padding: 24px; } [pam-Unit-Test] { border: 1px solid #999; text-align: center; padding: 16px; margin: 5px; } [pam-Menu-Scrollable-Test] { width: 200px; height: 150px; border: 1px solid #666; } [pam-Theme-Test] { padding: 16px; text-align: center; } [pam-Theme-Test~="text"] { background-color: #ddd; } [pam-Tile] h3 { margin: 0; } [pam-Tile] h4 { margin: 0; } #pure span { color: #dd514c !important; } #amcss span { color: #965ddc !important; } #material span { color: #00bcd4 !important; } .pure { color: #dd514c !important; } .amcss { color: #965ddc !important; } .material { color: #00bcd4 !important; } [sg-mock-icon] { width: 24px; height: 24px; background-color: #616161; }

### Body

    .sg-menu
        .sg-title <span class="pure">P</span><span class="amcss">A</span><span class="material">M</span><span>- styleguide</span>
        nav.sg-toc
    .sg-content
        section.sg-section
            h2#concepts.sg Concepts

            section.sg-block
                div.sg-text
                    h3#pure.sg <span>P</span>ure
                    p PAM is based on #[a(target="_blank", href="http://purecss.io/") Pure.css]. It is a set of small, responsive CSS modules created by Yahoo.

            section.sg-block
                div.sg-text
                    h3#amcss.sg <span>A</span>MCSS
                    p PAM markup syntax use the concept of Attribute Modules for CSS (#[a(target="_blank", href="https://amcss.github.io/") AMCSS]), which is a methodology for using HTML attributes and their values rather than classes for styling elements. The result is more readable and maintainable HTML & CSS.

            section.sg-block
                div.sg-text
                    h3#material.sg <span>M</span>aterial design
                    p #[a(target="_blank", href="https://www.google.com/design/spec/material-design/introduction.html") Material design], a visual language for the classic principles of good design with the innovation and possibility of technology and science.

            section.sg-block
                div.sg-text
                    h3#hooks.sg Hooks
                    p PAM uses the concepts of hooks which are LESS Mixins, this approach is inspired by the excellent #[a(target="_blank", href="http://getuikit.com/") UIkit front-end framework]. These mixins hook into predefined selectors and make it possible to add properties. This makes the process of customization much more convenient. Component hooks are presented at the end of every section.

        div(sg-content)
        .sg-copyright &copy; Mr Green
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="styleguide.js"></script>