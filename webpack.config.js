module.exports = {
  target: 'node',
  entry: 'index.ts',
  devtool: 'source-map',
  context: __dirname + '/src',
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    pathinfo: true,
    libraryTarget: 'umd',
  },
  resolve: {
    modules: ['.', 'src', 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true },
        },
      },
    ],
  },
  externals: [
    'fs',
    'ngx-toastr',
    /^rxjs/,
    /^@angular/,
    /^@ng-bootstrap/,
    /^tabby-/,
  ],
}
