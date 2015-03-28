/* HotNode by odin3 */
function HotNode(name)
{
    this.name = name;
    this.attrib = [];
    this.innerText = "";
}
HotNode.prototype.setAttribute = function(name,value)
{
    this.attrib[name] = value;
    return this.attrib[name];
}
HotNode.prototype.getAttribute = function(name)
{
    return this.attrib[name];
}
HotNode.prototype.setNode = function(content)
{
    this.innerText = content;
}
HotNode.prototype.pairTag = true;
HotNode.prototype.HTML = function()
{
    var inner = "<"+this.name;
       for (var key in this.attrib) 
       { 
            var val = this.attrib[key]; 
            inner = inner+" "+key+"=\""+val+"\"";
        }
        if(this.pairTag)
        {
            inner = inner+">"+this.innerText+"</"+this.name+">";
        }
        else
        {
            inner+" />";
        }
    return inner;
}