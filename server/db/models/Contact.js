function Contact(_node, contactDate) {
  this.name = _node.properties.name
  this.username = _node.properties.username
  this.contactDate = new Date(contactDate)
}

module.exports = Contact
