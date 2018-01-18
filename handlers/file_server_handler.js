let DefaultHandler = require('./default_handler.js');
class StaticFileHandler extends DefaultHandler {
  constructor(root, fs) {
    super()
    this.root = root;
    this.fs = fs;
  }
  getFilePath(url) {
    return `./${this.root}${url}`;
  }
  getContentType(filePath) {
    let contentTypes = {
      '.js': 'text/javascript',
      '.html': 'text/html',
      '.css': 'text/css',
      '.jpeg': 'image/jpeg',
      '.txt': 'text/plain',
      '.pdf': 'application/pdf',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.ico': "image/ico"
    }
    let fileExtension = filePath.slice(filePath.lastIndexOf('.'));
    return contentTypes[fileExtension];
  }
  execute(req, res) {
    let path = this.getFilePath(req.url);
    try {
      var data = this.fs.readFileSync(path, 'utf8');
    } catch (e) {
      return;
    }
    res.setHeader("Content-Type", this.getContentType(path));
    res.write(data);
    res.end();
  }
}

module.exports = StaticFileHandler;