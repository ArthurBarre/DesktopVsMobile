class Platform{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'white';
        instance.platforms.push(this);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    process() {
        this.draw()
    }
}
