class Platform{
    constructor(x,y,width,height,){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        platforms.push(this);
        this.color='white';
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
