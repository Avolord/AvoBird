let saveFile = function(filename, data) {
    var blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

class CanDraw {
  constructor(Width,Height,BackgroundColor,BorderWidth,Id) {
    this.Element = document.createElement("canvas");
    this.Element.id = (Id) ? Id : "canvas";
    document.body.appendChild(this.Element);
    this.Element.width = (Width) ? Width : (window.innerWidth - this.Element.offsetLeft*4);
    this.Element.height = (Height) ? Height : (window.innerHeight - this.Element.offsetTop*4);
    this.Element.style.border = (BorderWidth) ? BorderWidth+"px solid black" : undefined;
    this.Element.style.backgroundColor = (BackgroundColor) ? BackgroundColor : "white";
    this.ctx = this.Element.getContext("2d");
    this.translate = {x:0,y:0};
    this.Translate(this.Element.width/2,this.Element.height/2);
    this.style = "fill";
    this.gradient = this.ctx.createLinearGradient(0,0,50,50);
    this.Pictures = [];
    this.ctx.textAlign = "center";
  }

  Clear() {
    this.ctx.clearRect(-this.translate.x,-this.translate.y,this.Element.width,this.Element.height);
  }

  Gradient(Element,color) {
    const amount = 1/arguments.length;
    for(let i=0,n=arguments.length;i<n;i++) {
      this.gradient.addColorStop(amount*i,arguments[i]);
    }
    this.ctx.fillStyle = this.gradient;
  }

  StartDraw(color) {
      if(color) {this.ctx.fillStyle = color;this.ctx.strokeStyle = color;}
      this.ctx.beginPath();
  }

  EndDraw(style) {
    this.ctx.closePath();
    switch(style) {
      case "fill":
      this.ctx.fill();
      break;
      case "stroke":
      this.ctx.stroke();
      break;
    }
  }

  alpha(alpha) {
    this.ctx.globalAlpha = alpha || 1;
  }

  adaptSize() {
    this.Element.width = window.innerWidth - this.Element.offsetLeft*2;
    this.Element.height = window.innerHeight - this.Element.offsetTop;
  }

  Translate(x_,y_) {
    this.ctx.translate(-this.translate.x,-this.translate.y);
    this.ctx.translate(x_,y_);
    this.translate = {x:x_,y:y_};
  }

  Circle(x,y,r,style,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    this.ctx.arc(x,y,r,0,Math.PI*2);
    this.EndDraw(style || this.style);
  }

  Dot(x,y,color,style) {
    this.StartDraw(color || this.ctx.fillStyle);
    this.ctx.arc(x,y,2,0,Math.PI*2);
    this.EndDraw(style || this.style);
  }

  Rectangle(x,y,w,h,style,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    switch(style || this.style) {
      case "fill":
      this.ctx.fillRect(x,y,w,h);
      break;
      case "stroke":
      this.ctx.strokeRect(x,y,w,h);
      break;
    }
  }

  Write(x,y,text,size,color,style) {
    this.ctx.font = (size || 30)+"px Arial";
    this.ctx.fillStyle = color || this.ctx.fillStyle;
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    if(style && style=="stroke")this.ctx.strokeText(text,x,y);
    if(style && style=="fill")this.ctx.fillText(text,x,y);
    if(!style && this.style=="stroke")this.ctx.strokeText(text,x,y);
    if(!style && this.style=="fill")this.ctx.fillText(text,x,y);
  }

  Line(x,y,x2,y2,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    this.ctx.moveTo(x,y);
    this.ctx.lineTo(x2,y2);
    this.EndDraw("stroke");
  }

  SymPolygon(x_,y_,corners,length,style,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    let angleAdd = Math.PI*2/corners;
    let angle = 0;
    let num = (corners%2==0) ? 2 : 4;
    this.ctx.moveTo(length * Math.cos(angle-angleAdd/num) + x_,Math.sin(angle-angleAdd/num) + y_);
    let x,y;
    for(let i=0;i<corners+1;i++) {
      x = length * Math.cos(angle-angleAdd/num) + x_;
      y = length * Math.sin(angle-angleAdd/num) + y_;
      angle+=angleAdd;
      this.ctx.lineTo(x,y);
  }
    this.EndDraw(style || this.style);
}

  Picture(src,Id) {
    let Img = document.createElement("image");
              document.body.appendChild(Img);
              Img.Id = Id;
              Img.src = src;
              console.log(Img);
    this.Pictures.push(Img);
  }

}




class AM {
static Pythag(Arr) {
let sum = Arr.map(x => x*x);
    sum = sum.reduce((a,b) => a + b , 0);
    return Math.sqrt(sum)
}

static Pythag2(Arr) {
  let sum = 0;
  for(let i=0,n=Arr.length;i<n;i++) {
    sum+=Arr[i]*Arr[i];
  }
  return Math.sqrt(sum)
}

static radians  (a) {return a*(Math.PI/180)};

static cos  (a)  {return Math.cos(a)};
static sin  (a)  {return Math.sin(a)};
static tan  (a)  {return Math.tan(a)};
static acos  (a) {return Math.acos(a)};
static asin  (a) {return Math.asin(a)};
static atan  (a) {return Math.atan(a)};


static root (a,b)  {return Math.pow(a,1/b)};
static pow  (a,b)   {return Math.pow(a,b)};

static fak  (a)  {
  let n = (a!=0) ? 1 : 1;
  for(let i=1;i<=a;i++) {
    n*=i;
  }
  return n
}

static PQ  (p,q)  {
  const a = (-p/2);
  const b = AM.root( AM.pow( (p/2) , 2) -q,2);
  return [a+b,a-b];
}

static round  (num,didgets)  {return Math.round(num*AM.pow(10,didgets))/AM.pow(10,didgets)};

static map  (input,start,stop,min,max)  {return (input-start)*((max-min)/(stop-start))+min};

static RandInt  (start,stop)  {return Math.round(Math.random()*stop+start)};

static smooth(a) {return Math.round(a*100000)/100000}

static calcDist  (x,y,x2,y2)  {
  const dx = x-x2;
  const dy = y-y2;
  return AM.Pythag([dy,dx]);
}

static calcDist2  (x,y,x2,y2)  {
  const dx = x-x2;
  const dy = y-y2;
  return AM.Pythag2([dy,dx]);
}

//Physics
static Force  (m,a)  {return m*a};
static Work  (F,s,alpha)  {return F*s*AM.cos(alpha)};
static constacc  (v,t)  {return v/t};
static contacc  (a,t)  {return 0.5*a*AM.pow(t,2)};
static vel  (s,t)  {return s/t};
static weight  (mass)  {return mass*World.Grav};
static GravConst()  {return 6.672*AM.pow(10,-11)};
static vLight()  {return 299792458};
static GravForce  (mass1,mass2,distance)  {return (GravConst*mass1*mass2)/AM.pow(distance,2)}
//Physics End

//Waves
static WaveEquation(ymax,t,T,x,Lambda) {return ymax*MA.sin(2*PI)*(t/T-x/Lambda)}
static Reflexion(alpha) {return alpha};
//Waves End

static Matrix() {
  let result = [];
  for(let i=0;i<arguments.length;i++) {
    arguments[i].splice
    result.push(arguments[i]);
  }
  return result;
}

static ArrayAdd (A1,A2) {
  let result = [];
  length = (A1.length>A2.length) ? A1.length : A2.length;
  for(let i=0;i<length;i++) {
    const val1 = (A1[i]==undefined)? 0 : A1[i];
    const val2 = (A2[i]==undefined)? 0 : A2[i];
    result.push(val1+val2);
  }
  return result;
}

static ArraySub  (A1,A2) {
  let result = [];
  length = (A1.length>A2.length) ? A1.length : A2.length;
  for(let i=0;i<length;i++) {
    const val1 = (A1[i]==undefined)? 0 : A1[i];
    const val2 = (A2[i]==undefined)? 0 : A2[i];
    result.push(val1-val2);
  }
  return result;
}

static ArrayMult(Arr,number) {
  let result = [];
  for(let i=0,n=Arr.length;i<n;i++) {
    result.push(Arr[i]*number);
  }
  return result;
}

static ArrayDiv(Arr,number) {
  let result = [];
  for(let i=0,n=Arr.length;i<n;i++) {
    result.push(Arr[i]/number);
  }
  return result;
}

static Vvalue(V) {
  return AM.Pythag(V);
}

static Vnorm(V) {
  return AM.ArrayDiv(V,AM.Vvalue(V));
}

static Vangle(V1,V2) {
  const angle = AM.acos(AM.DotProduct(V1,V2)/(AM.Vvalue(V1)*AM.Vvalue(V2)));
  return AM.radians(angle);
}

static DotProduct(A1,A2) {
  let result = 0;
  length = (A1.length>A2.length) ? A1.length : A2.length;
  for(let i=0;i<length;i++) {
    const val1 = (A1[i]==undefined)? 0 : A1[i];
    const val2 = (A2[i]==undefined)? 0 : A2[i];
    result+=(val1*val2);
  }
  return result;
}

static randomArray(start,end,length) {
  let Arr = new Array(length || 1);
  for(let i= 0;i<length;i++) {
    Arr[i] = AM.RandInt(start,end);
  }
  return Arr;
}

static countinArr(Arr,entity) {
  let result = 0;
  for(let i in Arr) {
    result = (Arr[i]==entity) ? result+1 : result;
  }
  return result;
}

static copyArray(A) {
  let Arr = new Array(A.length);
  for(let i in A) {
    Arr[i] = A[i];
  }
  return Arr;
}

static TransformLinEqu(A1,A2){
  let Arr1 = A1;
  let Arr2 = A2;
  for(let i=0,n=Arr1.length;i<n;i++) {
    if(Arr2[i][1] != undefined && Arr2[i][1]!=0) {
    Arr1[i].push(-Arr2[i][1]);
    Arr2[i].splice(1,2);
  }
    Arr2[i][0]-=Arr1[i][0];
    Arr1[i].splice(0,1)
    Arr1[i].push(Arr2[i][0])
  }
  return Arr1;
}

static MatrixAdd(Ma1,Ma2) {
  let EArr = [0,0,0];
  let result = [];
  const length = (Ma1.length>Ma2.length) ? Ma1.length : Ma2.length;
  for(let i=0;i<length;i++) {
    if(Ma1[i]==undefined) {
      result.push(AM.ArrayAdd(Ma2[i],EArr));
      continue;
    }
    if(Ma2[i]==undefined) {
      result.push(AM.ArrayAdd(Ma1[i],EArr));
      continue;
    }
    result.push(AM.ArrayAdd(Ma1[i],Ma2[i]));
  }
  return result;
}

static MatrixSub(Ma1,Ma2){
  let EArr = [0,0,0];
  let result = [];
  const length = (Ma1.length>Ma2.length) ? Ma1.length : Ma2.length;
  for(let i=0;i<length;i++) {
    if(Ma1[i]==undefined) {
      result.push(AM.ArraySub(Ma2[i],EArr));
      continue;
    }
    if(Ma2[i]==undefined) {
      result.push(AM.ArraySub(Ma1[i],EArr));
      continue;
    }
    result.push(AM.ArraySub(Ma1[i],Ma2[i]));
  }
  return result;
}

static MatrixMult(Matrix,number) {
  let result = [];
  for(let i=0,n=Matrix.length;i<n;i++) {
    result.push(AM.ArrayMult(Matrix[i],number));
  }
  return result;
}

static MatrixDiv(Matrix,number) {
  let result = [];
  for(let i=0,n=Matrix.length;i<n;i++) {
    result.push(AM.ArrayDiv(Matrix[i],number));
  }
  return result;
}

static Gaussian(A) {
  var n = A.length;
    for (var i=0; i<n; i++) {
        var maxEl = Math.abs(A[i][i]);
        var maxRow = i;
        for(var k=i+1; k<n; k++) {
            if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            }
        }
        for (var k=i; k<n+1; k++) {
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }
        for (k=i+1; k<n; k++) {
            var c = -A[k][i]/A[i][i];
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = A[i][n]/A[i][i];
        for (var k=i-1; k>-1; k--) {
            A[k][n] -= A[k][i] * x[i];
        }
    }
    return x;
}

static CheckOrthog(V1,V2) {
  if(AM.DotProduct(V1,V2)==0)
    return "Die Vektoren sind Orthogonal!";
  else {
    return "Die Vektoren sind nicht Orthogonal!";
  }
}

static convertFunc(funcArr,start) {
  let x = (start) ? start : "x";
  let func = "f("+x+")=";
      x = (start) ? "*"+start : "x";
      console.log(funcArr);
  for(let i=funcArr.length-1;i>=0;i--) {
    if(funcArr[i]==0) {continue}
    let curr = (i>1) ? funcArr[i]+x+AM.AsciiExp(i)+"+" : funcArr[i]+x+"+";
        curr = (i==1) ? funcArr[i]+"x+" : curr;
        curr = (i==0) ? funcArr[i] : curr;
        curr = (i==1 && funcArr[i-1]==0) ? funcArr[i]+"x" : curr
    func = func.concat(curr);
  }
  return func;
}

static calcFunc(Func,x,show) {
  let result = 0;
  for(let i=Func.length-1;i>0;i--) {
    const curr = AM.pow(x,i);
    result+=Func[i]*curr;
  }
    result+=Func[0];
    if (show==true) {console.log (AM.convertFunc(Func,x)+" = "+result);}
    return result;
}

static derive(Func,amount,show) {
  let result = Func;
  const am = (amount) ? amount : 1;
  for(let z=0;z<am;z++) {
  for(let i=Func.length-1;i>0;i--) {
    result[i]*=i;
  }
  result.splice(0,1);
}
  if (show==true) {console.log (AM.convertFunc(result))}
  return result;
}

static primitive(Func,amount,show) {
  let result = Func;
  const am = (amount) ? amount : 1;
  for(let z=0;z<am;z++) {
  for(let i=Func.length-1;i>0;i--) {
    result[i]/=(i+1);
  }
  result.unshift(0);
}
  if (show==true) {console.log (AM.convertFunc(result))}
  return result;
}

static Integral(upper,lower,Func) {
  let result;
  const CurrFunc = AM.primitive(Func);
  return AM.calcFunc(CurrFunc,upper)-AM.calcFunc(CurrFunc,lower)
}

static calcZero(Func) {
  if(Func.length==3) {
    return AM.PQ(Func[1],Func[0]);
  }
  if(Func.length==2) {
    return -Func[0]/Func[1];
  }
}

static FuncAreaX(Func) {
  const Zeros = AM.calcZero(Func);
  const upper = (Zeros[0]>Zeros[1]) ? Zeros[0] : Zeros[1];
  const lower = (Zeros[0]<Zeros[1]) ? Zeros[0] : Zeros[1];
  return Math.abs(AM.Integral(upper,lower,Func));
}

static AsciiExp(exp) {
  let exponent;
  switch(exp) {
    case 0:
    exponent = "\u2070";
    break;
    case 1:
    exponent = "\u00B9";
    break;
    case 2:
    exponent = "\u00B2";
    break;
    case 3:
    exponent = "\u00B3";
    break;
    case 4:
    exponent = "\u2074"
    break;
    case 5:
    exponent = "\u2075"
    break;
    case 6:
    exponent = "\u2076"
    break;
    case 7:
    exponent = "\u2077"
    break;
    case 8:
    exponent = "\u2078"
    break;
    case 9:
    exponent = "\u2079"
    break;
    default:
    exponent = AM.AsciiExp((exp-exp%10)/10)+AM.AsciiExp(exp%10);
    break;
  }
  return exponent
}

static renderHarmonic(type,stepsize) {
  cclear();
  AM.CoordSys();
  stepsize = (stepsize) ? stepsize : 10;
  ctx.translate(c.width/2,c.height/2);
  ctx.beginPath();

    switch(type) {
      case "cos":
      ctx.moveTo(-c.width/2,-AM.cos(-c.width/2)*stepsize);
      break;
      case "sin":
      ctx.moveTo(-c.width/2,-AM.sin(-c.width/2)*stepsize);
      break;
      case "tan":
      ctx.moveTo(-c.width/2,-AM.tan(-c.width/2)*stepsize);
      break;
      case "acos":
      ctx.moveTo(-c.width/2,-AM.acos(-c.width/2)*stepsize);
      break;
      case "asin":
      ctx.moveTo(-c.width/2,-AM.asin(-c.width/2)*stepsize);
      break;
      case "atan":
      ctx.moveTo(-c.width/2,-AM.atan(-c.width/2)*stepsize);
      break;
    }
  for(let i=-c.width/2;i<c.width;i++) {
    switch(type) {
      case "cos":
      ctx.lineTo(i,-AM.cos(i/stepsize)*stepsize);
      break;
      case "sin":
      ctx.lineTo(i,-AM.sin(i/stepsize)*stepsize);;
      break;
      case "tan":
      ctx.lineTo(i,-AM.tan(i/stepsize)*stepsize);
      break;
      case "acos":
      ctx.lineTo(i,-AM.acos(i/stepsize)*stepsize);
      break;
      case "asin":
      ctx.lineTo(i,-AM.asin(i/stepsize)*stepsize);
      break;
      case "atan":
      ctx.lineTo(i,-AM.atan(i/stepsize)*stepsize);
      break;
    }
  }
  ctx.stroke();
  ctx.translate(-c.width/2,-c.height/2);
}

static renderFunc(Func,stepsize) {
  cclear();
  AM.CoordSys();
  stepsize = (stepsize) ? stepsize : 10;
  ctx.translate(c.width/2,c.height/2);
  ctx.beginPath();
  ctx.moveTo(-c.width/2,-AM.calcFunc(Func,-c.width/2));
for(let i=-c.width/2;i<c.width;i+=stepsize) {
  ctx.lineTo(i,-AM.calcFunc(Func,i/stepsize));
}
ctx.stroke();
  ctx.translate(-c.width/2,-c.height/2);
}

static CoordSys() {
  ctx.beginPath();
  ctx.moveTo(0,c.height/2);
  ctx.lineTo(c.width,c.height/2);
  ctx.moveTo(c.width/2,0);
  ctx.lineTo(c.width/2,c.height);
  ctx.stroke();
}

}

let GetMouseCoordinates = (count,Arr) => {
  let MX;
  let MY;
  let active = true;
  let counter = (count) ? count : 1;
c.onmousedown = function(e) {
  MX = e.pageX - this.offsetLeft - c.width/2;
  MY = e.pageY - this.offsetTop - c.height/2;
  if(active) {Arr.push([MX,MY]); console.log(MX,MY)}
  counter--;
  if(counter==0) {active = false}
}
}

class Matrix{
  constructor() { //When inp to integers it`ll be handeld as collums and rows filled with 0
    this.Matrix = [];
    for(let i=0;i<arguments.length;i++) {
      arguments[i].splice
      this.Matrix.push(arguments[i]);
    }
    if(arguments.length==2 && typeof arguments[0] != Array && typeof arguments[1] != Array) {
      this.Matrix = [];
      let TempRow = [];
      for(let z=0;z<arguments[1];z++) {
        for(let i=0;i<arguments[0];i++) {
          TempRow.push(0);
        }
        this.Matrix.push(TempRow);
        TempRow = [];
      }
    }
  }

  MatrixAdd(Ma2) {
    let EArr = [0,0,0];
    let result = [];
    const length = (this.Matrix.length>Ma2.length) ? this.Matrix.length : Ma2.length;
    for(let i=0;i<length;i++) {
      if(Ma1.Matrix[i]==undefined) {
        result.push(Matrix.ArrayAdd(Ma2[i],EArr));
        continue;
      }
      if(Ma2[i]==undefined) {
        result.push(Matrix.ArrayAdd(this.Matrix[i],EArr));
        continue;
      }
      result.push(Matrix.ArrayAdd(this.Matrix[i],Ma2[i]));
    }
    return result;
  }

  MatrixSub(Ma2) {
    let EArr = [0,0,0];
    let result = [];
    const length = (this.Matrix.length>Ma2.length) ? this.Matrix.length : Ma2.length;
    for(let i=0;i<length;i++) {
      if(Ma1.Matrix[i]==undefined) {
        result.push(Matrix.ArraySub(Ma2[i],EArr));
        continue;
      }
      if(Ma2[i]==undefined) {
        result.push(Matrix.ArraySub(this.Matrix[i],EArr));
        continue;
      }
      result.push(Matrix.ArraySub(this.Matrix[i],Ma2[i]));
    }
    return result;
  }

  MatrixMult(number) {
    let result = [];
    for(let i=0,n=this.Matrix.length;i<n;i++) {
      result.push(Matrix.ArrayMult(this.Matrix[i],number));
    }
    return result;
  }

  MatrixDiv(number) {
    let result = [];
    for(let i=0,n=this.Matrix.length;i<n;i++) {
      result.push(Matrix.ArrayDiv(this.Matrix[i],number));
    }
    return result;
  }

  static ArrayAdd (A1,A2) {
    let result = [];
    let length = (A1.length>A2.length) ? A1.length : A2.length;
    for(let i=0;i<length;i++) {
      const val1 = (A1[i]==undefined)? 0 : A1[i];
      const val2 = (A2[i]==undefined)? 0 : A2[i];
      result.push(val1+val2);
    }
    return result;
  }

  static ArraySub(A1,A2) {
    let result = [];
    let length = (A1.length>A2.length) ? A1.length : A2.length;
    for(let i=0;i<length;i++) {
      const val1 = (A1[i]==undefined)? 0 : A1[i];
      const val2 = (A2[i]==undefined)? 0 : A2[i];
      result.push(val1-val2);
    }
    return result;
  }

  static ArrayMult(Arr,number) {
    let result = [];
    for(let i=0,n=Arr.length;i<n;i++) {
      result.push(Arr[i]*number);
    }
    return result;
  }

  static ArrayDiv(Arr,number) {
    let result = [];
    for(let i=0,n=Arr.length;i<n;i++) {
      result.push(Arr[i]/number);
    }
    return result;
  }

  Gaussian() {
    var n = this.Matrix.length;
      for (var i=0; i<n; i++) {
          var maxEl = Math.abs(this.Matrix[i][i]);
          var maxRow = i;
          for(var k=i+1; k<n; k++) {
              if (Math.abs(this.Matrix[k][i]) > maxEl) {
                  maxEl = Math.abs(this.Matrix[k][i]);
                  maxRow = k;
              }
          }
          for (var k=i; k<n+1; k++) {
              var tmp = this.Matrix[maxRow][k];
              this.Matrix[maxRow][k] = this.Matrix[i][k];
              this.Matrix[i][k] = tmp;
          }
          for (k=i+1; k<n; k++) {
              var c = -this.Matrix[k][i]/this.Matrix[i][i];
              for(var j=i; j<n+1; j++) {
                  if (i==j) {
                      this.Matrix[k][j] = 0;
                  } else {
                      this.Matrix[k][j] += c * this.Matrix[i][j];
                  }
              }
          }
      }
      var x= new Array(n);
      for (var i=n-1; i>-1; i--) {
          x[i] = this.Matrix[i][n]/this.Matrix[i][i];
          for (var k=i-1; k>-1; k--) {
              this.Matrix[k][n] -= this.Matrix[k][i] * x[i];
          }
      }
      return x;
  }

  MatrixProd(Ma2) {
    if(this.Matrix.length!=Ma2.Matrix.length) {return "has to be the same type"}
    let result;
    if(Ma2.Matrix.length==3 && Ma2.Matrix[0].length==3) {
      result = new Matrix([0,0,0],[0,0,0],[0,0,0]);
      for(let i=0;i<3;i++) {
          result.Matrix[i][0] = this.Matrix[i][0]*Ma2.Matrix[0][0]+this.Matrix[i][1]*Ma2.Matrix[1][0]+this.Matrix[i][2]*Ma2.Matrix[2][0];
          result.Matrix[i][1] = this.Matrix[i][0]*Ma2.Matrix[0][1]+this.Matrix[i][1]*Ma2.Matrix[1][1]+this.Matrix[i][2]*Ma2.Matrix[2][1];
          result.Matrix[i][2] = this.Matrix[i][0]*Ma2.Matrix[0][2]+this.Matrix[i][1]*Ma2.Matrix[1][2]+this.Matrix[i][2]*Ma2.Matrix[2][2];
      }
    }
    else {
      result = new Matrix(Ma2.Matrix.length,Ma2.Matrix[0].length);
      for(let i=0,c=Ma2.Matrix.length;i<c;i++) {
        for(let z=0,r=Ma2.Matrix[0].length;z<r;z++) {
          let  res = 0;
          for(let d=0;d<r;d++) {
            res += this.Matrix[i][d]*Ma2.Matrix[d][z];
          }
          result.Matrix[i][z] = res;
        }
      }
    }
    return result;
  }

}


class V2D {
  constructor(x,y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  value() {
    return AM.Pythag([this.x,this.y]);
  }

  valueSq() {
    return this.x*this.x+this.y*this.y;
  }

  norm(length) {
    if(length) {
      return this.div(this.value()).mult(length || 1)
    } else {
      return this.div(this.value());
    }
  }

  invert() {
    return new V2D(-this.x,-this.y);
  }

  invertX() {
    return new V2D(-this.x,this.y);
  }

  invertY() {
    return new V2D(this.x,-this.y);
  }

  mix(V2, amount) {
    return this.add(V2.sub(this).mult(amount || 1));
  }

  mixX(V2, amount) {
    return new V2D(this.x+(V2.x-this.x)*(amount || 1),this.y);
  }

  mixY(V2, amount) {
    return new V2D(this.x,this.y+(V2.y-this.y)*(amount || 1));
  }

  limit(value, amount) {
    const x = (this.x>value) ? this.x*amount : this.x;
    const y = (this.y>value) ? this.y*amount : this.y;
    return new V2D(x,y);
  }


  div(v) {
    if(v instanceof V2D) {
      return new V2D(this.x/v.x,this.y/v.y);
    } else {
      return new V2D(this.x/v,this.y/v);
    }
  }

  divX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x/v.x,this.y);
    } else {
      return new V2D(this.x/v,this.y);
    }
  }

  divY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y/v.y);
    } else {
      return new V2D(this.x,this.y/v);
    }
  }

  mult(v) {
    if(v instanceof V2D) {
      return new V2D(this.x*v.x,this.y*v.y);
    } else {
      return new V2D(this.x*v,this.y*v);
    }
  }

  multX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x*v.x,this.y);
    } else {
      return new V2D(this.x*v,this.y);
    }
  }

  multY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y*v.y);
    } else {
      return new V2D(this.x,this.y*v);
    }
  }

  add(v) {
    if(v instanceof V2D) {
      return new V2D(this.x+v.x,this.y+v.y);
    } else {
      return new V2D(this.x+v,this.y+v);
    }
  }

  addX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x+v.x,this.y);
    } else {
      return new V2D(this.x+v,this.y);
    }
  }

  addY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y+v.y);
    } else {
      return new V2D(this.x,this.y+v);
    }
  }

  sub(v) {
    if(v instanceof V2D) {
      return new V2D(this.x-v.x,this.y-v.y);
    } else {
      return new V2D(this.x-v,this.y-v);
    }
  }

  subX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x-v.x,this.y);
    } else {
      return new V2D(this.x-v,this.y);
    }
  }

  subY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y-v.y);
    } else {
      return new V2D(this.x,this.y-v);
    }
  }

  absDiff(V2) {
    return new V2D(Math.abs(this.x-V2.x),Math.abs(this.y-V2.y));
  }

  dotP(V2) {
    return this.x*V2.x+this.y*V2.y;
  }

  crossP(V2) {
    return this.x*V2.x-this.y*V2.y;
  }

  Vangle(V2) {
    return AM.radians( AM.acos( this.dotP(V2) / ( this.value() * V2.value() )));
  }

  dist(V2) {
    return this.absDiff(V2).value();
  }

  distSq(V2) {
    return (this.x-V2.x)*(this.x-V2.x)+(this.y-V2.y)*(this.y-V2.y);
  }

  distX(V2) {
    return this.x-V2.x;
  }

  distY(V2) {
    return this.y-V2.y;
  }

  absDistX(V2) {
    return Math.abs(this.x-V2.x);
  }

  absDistY(V2) {
    return Math.abs(this.y-V2.y);
  }

  clone() {
    return new V2D(this.x,this.y);
  }

  copy(V2) {
    this.x = V2.x;
    this.y = V2.y;
  }

  copyX(V2) {
    this.x = V2.x;
  }

  copyY(V2) {
    this.x = V2.x;
  }

  show() {
    Canvas.Dot(this.x,this.y);
  }

  toString() {
    return "=> x:"+this.x+" , y:"+this.y;
  }

  toArray() {
    return [this.x,this.y]
  }

  toObject() {
    return {x:this.x,y:this.y}
  }

  unfloat() {
    return new V2D(Math.round(this.x),Math.round(this.y));
  }

  max() {
    return new V2D(Math.ceil(this.x),Math.ceil(this.y));
  }

  min() {
    return new V2D(Math.floor(this.x),Math.floor(this.y));
  }

  randomize(topLeft, bottomRight) {
    return new V2D(AM.RandInt(topLeft.x,bottomRight.x-topLeft.x),AM.RandInt(topLeft.y,bottomRight.y-topLeft.y))
  }

  randomizeX(topLeft, bottomRight) {
    return new V2D(this.x,AM.RandInt(topLeft.y,bottomRight.y-topLeft.y))
  }

  randomizeY(topLeft, bottomRight) {
    return new V2D(AM.RandInt(topLeft.x,bottomRight.x-topLeft.x),this.y)
  }

  Rectangle(Corner2,color,style) {
    Canvas.Rectangle(this.x,this.y,Corner2.distX(this),Corner2.distY(this),style,color);
  }

  CircleCENTER(Corner2,color,style) {
    Canvas.Circle(this.x,this.y,this.dist(Corner2),style,color);
  }

  Circle(Corner2,color,style) {
    let x = this.x+Corner2.distX(this)/2,
        y = this.y+Corner2.distY(this)/2,
        r = this.dist(Corner2)/2;
    Canvas.Circle(x,y,r,style,color);
  }

  draw(size,color) {
    Canvas.Circle(this.x,this.y,size || 5,"",color || "white");
  }

  Connect(V2,color) {
    Canvas.Line(this.x,this.y,V2.x,V2.y,color || "white");
  }

  Orthogonal() {
    return new V2D(-this.y,this.x);
  }

  CheckOrthog(V2) {
    if(this.dotP(V2)==0)
    return true
    else
    return false
  }

  rotate(angle,length) {
    return new V2D(AM.cos(angle)*(length || 100),AM.sin(angle)*(length || 100));
  }

  rotateAround(V2,angle,length) {
    return new V2D(AM.cos(angle)*(length || 100)+V2.x,AM.sin(angle)*(length || 100)+V2.y);
  }

  SCHNITT(P1,P2,P3) {
    let rv2 = P1.sub(this);
    let rv1 = P3.sub(P2);
    const dx = this.x-P2.x;
    const dy = this.y-P2.y;
    let sol1 =  (dy*rv1.x-dx*rv1.y)/((-rv2.y)*rv1.x+rv2.x*rv1.y);
    let sol2 =  ((-rv2.x)*dy+rv2.y*dx)/((-rv2.x)*rv1.y+rv2.y*rv1.x);
    //Canvas.Dot(this.x+rv2.x*sol1,this.y+rv2.y*sol1,"blue");
    if(!sol1 || !sol2 || sol2<0 || sol2>1) {sol1=1.1}
    return sol1
  }

}

class Sort {
  static Avo(List) {

    let Arr = List;
    let lowest;
    let result = [];
    let index = 0;

    while(Arr.length>0) {
      lowest = Arr[0];
      for(let i = 0;i<Arr.length;i++) {
        if(Arr[i] <= lowest) {
          index = i;
          lowest = Arr[i];
        }
      }
      result.push(Arr[index]);
      console.log(Arr);
      Arr.splice(index,1);
      console.log(Arr);
      if(Arr.length==0) {return result}
    }
  }

  static Bubble(List) {
    for(let z=0, n=List.length; z<n; z++) {
      for(let i=0;i<n;i++) {
        if(List[i] > List[i+1]) {
          const temp = List[i];
          List[i] = List[i+1];
          List[i+1] = temp;
        }
      }
    }
    return List
  }

}

class V3D {
  constructor(x,y,z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  value() {
    return AM.Pythag([this.x,this.y,this.z]);
  }

  valueSq() {
    return this.x*this.x+this.y*this.y+this.z*this.z;
  }

  norm(length) {
    if(length) {
      return this.div(this.value()).mult(length || 1)
    } else {
      return this.div(this.value());
    }
  }

  invert() {
    return new V3D(-this.x,-this.y,-this.z);
  }

  invertX() {
    return new V3D(-this.x,this.y,this.z);
  }

  invertY() {
    return new V3D(this.x,-this.y,this.z);
  }

  invertZ() {
    return new V3D(this.x,this.y,-this.z);
  }

  mix(V2, amount) {
    return this.add(V2.sub(this).mult(amount || 1));
  }

  mixX(V2, amount) {
    return new V3D(this.x+(V2.x-this.x)*(amount || 1),this.y,this.z);
  }

  mixY(V2, amount) {
    return new V3D(this.x,this.y+(V2.y-this.y)*(amount || 1),this.z);
  }

  mixZ(V2, amount) {
    return new V3D(this.x,this.y,this.z+(V2.z-this.z)*(amount || 1));
  }

  limit(value, amount) {
    const x = (this.x>value) ? this.x*amount : this.x;
    const y = (this.y>value) ? this.y*amount : this.y;
    const z = (this.z>value) ? this.z*amount : this.z;
    return new V3D(x,y,z);
  }


  div(v) {
    if(v instanceof V3D) {
      return new V3D(this.x/v.x,this.y/v.y,this.z/v.z);
    } else {
      return new V3D(this.x/v,this.y/v,this.z/v);
    }
  }

  divX(v) {
    if(v instanceof V3D) {
      return new V3D(this.x/v.x,this.y,this.z);
    } else {
      return new V3D(this.x/v,this.y,this.z);
    }
  }

  divY(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y/v.y,this.z);
    } else {
      return new V3D(this.x,this.y/v,this.z);
    }
  }

  divZ(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y,this.z/v.z);
    } else {
      return new V3D(this.x,this.y,this.z/v);
    }
  }

  mult(v) {
    if(v instanceof V3D) {
      return new V3D(this.x*v.x,this.y*v.y,this.z*v.z);
    } else {
      return new V3D(this.x*v,this.y*v,this.z*v);
    }
  }

  multX(v) {
    if(v instanceof V3D) {
      return new V3D(this.x*v.x,this.y,this.z);
    } else {
      return new V3D(this.x*v,this.y,this.z);
    }
  }

  multY(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y*v.y,this.z);
    } else {
      return new V3D(this.x,this.y*v,this.z);
    }
  }

  multZ(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y,this.z*v.z);
    } else {
      return new V3D(this.x,this.y,this.z*v);
    }
  }

  add(v) {
    if(v instanceof V3D) {
      return new V3D(this.x+v.x,this.y+v.y,this.z+v.z);
    } else {
      return new V3D(this.x+v,this.y+v,this.z+v);
    }
  }

  addX(v) {
    if(v instanceof V3D) {
      return new V3D(this.x+v.x,this.y,this.z);
    } else {
      return new V3D(this.x+v,this.y,this.z);
    }
  }

  addY(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y+v.y,this.z);
    } else {
      return new V3D(this.x,this.y+v,this.z);
    }
  }

  addZ(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y,this.z+v.z);
    } else {
      return new V3D(this.x,this.y,this.z+v);
    }
  }

  sub(v) {
    if(v instanceof V3D) {
      return new V3D(this.x-v.x,this.y-v.y,this.z-v.z);
    } else {
      return new V3D(this.x-v,this.y-v,this.z-v);
    }
  }

  subX(v) {
    if(v instanceof V3D) {
      return new V3D(this.x-v.x,this.y,this.z);
    } else {
      return new V3D(this.x-v,this.y,this.z);
    }
  }

  subY(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y-v.y,this.z);
    } else {
      return new V3D(this.x,this.y-v,this.z);
    }
  }

  subZ(v) {
    if(v instanceof V3D) {
      return new V3D(this.x,this.y,this.z-v.z);
    } else {
      return new V3D(this.x,this.y,this.z-v);
    }
  }

  absDiff(V2) {
    return new V3D(Math.abs(this.x-V2.x),Math.abs(this.y-V2.y),Math.abs(this.z-V2.z));
  }

  dotP(V2) {
    return this.x*V2.x+this.y*V2.y+this.z*V2.z;
  }

  crossP(V2) {
    return new V3D(this.y*V2.z-this.z*V2.y,this.z*V2.x-this.x*V2.z,this.x*V2.y-this.y*V2.x);
  }

  Vangle(V2) {
    return AM.radians( AM.acos( this.dotP(V2) / ( this.value() * V2.value() )));
  }

  dist(V2) {
    return this.absDiff(V2).value();
  }

  distSq(V2) {
    return (this.x-V2.x)*(this.x-V2.x)+(this.y-V2.y)*(this.y-V2.y)+(this.z-V2.z)*(this.z-V2.z);
  }

  distX(V2) {
    return this.x-V2.x;
  }

  distY(V2) {
    return this.y-V2.y;
  }

  distZ(V2) {
    return this.z-V2.z;
  }

  absDistX(V2) {
    return Math.abs(this.x-V2.x);
  }

  absDistY(V2) {
    return Math.abs(this.y-V2.y);
  }

  absDistY(V2) {
    return Math.abs(this.z-V2.z);
  }

  clone() {
    return new V3D(this.x,this.y,this.z);
  }

  copy(V2) {
    this.x = V2.x;
    this.y = V2.y;
    this.z = V2.z;
  }

  copyX(V2) {
    this.x = V2.x;
  }

  copyY(V2) {
    this.x = V2.x;
  }

  copyZ(V2) {
    this.z = V2.z;
  }

  toString() {
    return "=> x:"+this.x+" , y:"+this.y+" , z:"+this.z;
  }

  toArray() {
    return [this.x,this.y,this.z];
  }

  toObject() {
    return {x:this.x,y:this.y,z:this.z};
  }

  unfloat() {
    return new V3D(Math.round(this.x),Math.round(this.y),Math.round(this.z));
  }

  max() {
    return new V3D(Math.ceil(this.x),Math.ceil(this.y),Math.ceil(this.z));
  }

  min() {
    return new V3D(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z));
  }

  randomize(topLeftFront, bottomRightBack) {
    return new V3D(AM.RandInt(topLeftFront.x,bottomRightBack.x-topLeftFront.x),AM.RandInt(topLeftFront.y,bottomRightBack.y-topLeftFront.y),AM.RandInt(topLeftFront.z,bottomRightBack.z-topLeftFront.z));
  }

  randomizeY(topLeftFront, bottomRightBack) {
    return new V3D(this.x,AM.RandInt(topLeftFront.y,bottomRightBack.y-topLeftFront.y),this.z);
  }

  randomizeX(topLeftFront, bottomRightBack) {
    return new V3D(AM.RandInt(topLeftFront.x,bottomRightBack.x-topLeftFront.x),this.y,this.z);
  }

  randomizeX(topLeftFront, bottomRightBack) {
    return new V3D(this.x,this.y,AM.RandInt(topLeftFront.z,bottomRightBack.z-topLeftFront.z));
  }


  Orthogonal() {
    return new V3D(-this.y,0,this.z);
  }

  CheckOrthog(V2) {
    if(this.dotP(V2)==0)
    return true
    else
    return false
  }

}

class randVec2D extends V2D {
  constructor(topLeft, bottomRight) {
    super();
    this.x = AM.RandInt(topLeft.x,bottomRight.x-topLeft.x);
    this.y = AM.RandInt(topLeft.y,bottomRight.y-topLeft.y);
  }
}

class randVec3D extends V3D {
  constructor(topLeftFront, bottomRightBack) {
    super();
    this.x = AM.RandInt(topLeftFront.x,bottomRightBack.x-topLeftFront.x);
    this.y = AM.RandInt(topLeftFront.y,bottomRightBack.y-topLeftFront.y);
    this.z = AM.RandInt(topLeftFront.z,bottomRightBack.z-topLeftFront.z);
  }
}

let Physics2DObjects = [];
let Physics2DGravity = new V2D(0,9.81);

class Particle2D{
  constructor(x,y,r,mass) {
    this.pos = new V2D(x,y);
    this.vel = new V2D();
    this.acc = new V2D();
    this.mass = mass || 1;
    this.force = new V2D();
    this.rad = r || 10;
    Physics2DObjects.push(this);
  }

  static render(speed) {
    for(let i in Physics2DObjects) {
      Physics2DObjects[i].calcForces(speed || 1);
      Physics2DObjects[i].draw();
      Physics2DObjects[i].acc = new V2D();
      Physics2DObjects[i].force = new V2D();
    }
  }

  calcGravity() {
    this.force = this.force.add(Physics2DGravity.mult(this.mass));
  }

  calcForces(speed) {
    this.calcGravity();
    this.checkGroundCollision();
    this.convertForces(speed);
  }

  convertForces(speed) {
    this.acc = this.force.div(this.mass);
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel.mult(speed/60));
  }

  checkGroundCollision() {
    if(this.pos.y+this.rad>=Canvas.Element.height) {
      this.pos = new V2D(this.pos.x,Canvas.Element.height-this.rad);
      this.vel.y*=-1;
    }
    if(this.pos.y-this.rad<=0) {
      this.pos = new V2D(this.pos.x,0+this.rad);
      this.vel.y*=-1;
    }
    if(this.pos.x+this.rad>=Canvas.Element.width) {
      this.pos = new V2D(Canvas.Element.width-this.rad,this.pos.y);
      this.vel.x*=-1;
    }
    if(this.pos.x-this.rad<=0) {
      this.pos = new V2D(0+this.rad,this.pos.y);
      this.vel.x*=-1;
    }
  }

  draw() {
    this.pos.draw(this.r,"white");
  }

}

//Easy Animation / Loop

let AnimationLoopVariable;
let ClearCanvasOnLoop = true;

function Animation(active) {
  if(active) {
    AnimationLoopVariable = requestAnimationFrame(AnimationLoop);
  } else {
    cancelAnimationFrame(AnimationLoopVariable);
  }
}

function AnimationLoop() {
  if (typeof draw == 'function') {
    if(ClearCanvasOnLoop) {
      Canvas.Clear();
    }
    draw();
  }
  AnimationLoopVariable = requestAnimationFrame(AnimationLoop);
}

//Dunnso


class Button {
  constructor(caption,Id,template) {
    const text = document.createTextNode(caption || "Button");
    this.text = caption || "Button";
    this.Element = document.createElement("button");
    this.Element.appendChild(text);
    this.Element.id = (Id) ? Id : "button";
    this.template = template
    document.body.appendChild(this.Element);
  }

}

class Stochastics {
  constructor(InputArray) {
    this.values = Sort.Bubble(InputArray);
    this.amount = InputArray.length;
    this.CalculateDifferent();
    this.CalculateAbsolute();
    this.CalculateRelative();
    this.CalculateAverage();
    this.CalculateDeviation();
    this.CalculateInterval();
    this.CheckGaussian();
  }

  CalculateDifferent() {
    this.diff = [];
    let tempArr = AM.copyArray(this.values);
    let temp = tempArr[tempArr.length-1];
    while(tempArr.length>0) {
      this.diff.push(temp)
      for(let i = tempArr.length-1;i>=0;i--) {
        if(tempArr[i] == temp) {
          tempArr.pop();
        }
      }
      temp = tempArr[tempArr.length-1];
    }
    this.diff = Sort.Bubble(this.diff);
  }

  CalculateAbsolute() {
    this.abs = new Array(this.diff.length);
    for(let i in this.diff) {
      this.abs[i] = AM.countinArr(this.values,this.diff[i]);
    }
  }

  CalculateRelative() {
    this.rel = AM.copyArray(this.abs);
    this.rel = AM.ArrayDiv(this.rel,this.amount);
  }

  CalculateAverage() {
    this.average = 0;
    for(let i in this.abs) {
      this.average += this.diff[i]*this.rel[i];
    }
  }

  CalculateDeviation() {
    this.deviation = 0;
    for(let i in this.abs) {
      this.deviation += Math.pow(this.diff[i]-this.average,2) * this.rel[i];
    }
    this.deviation = Math.sqrt(this.deviation);
  }

  CalculateInterval() {
    this.Interval = {min:0,max:0};
    this.Interval.min = this.average-this.deviation;
    this.Interval.max = this.average+this.deviation;
  }

  CheckGaussian() {
    let result = 0;
    for(let i in this.values) {
      if(this.values[i]<this.Interval.min || this.values[i]>this.Interval.max) {
        result++;
      }
    }
    this.PartOfInterval = AM.smooth(1-result/this.amount);
  }

  createGraphic(x,y,w,h,color1,color2) {
    let width = w/this.diff.length-2;
    for(let i in this.diff) {
      const offset = (width+2)*i;
      const size = (h+w)/(4*1.2*this.diff.length);
      Canvas.Rectangle(x+offset,y+h,width,-AM.map(this.rel[i],0,1,0,h),"fill",color2 || "red");
      Canvas.Write(x+offset+width/2,y+h+size,this.diff[i],size,color1 || "white");
    }
    Canvas.Rectangle(x,y,w,h,"stroke",color1 || "white");
  }



}

function Bernoulli(n,p,a,b) {
	let result = 0;
	for(let i=a;i<=b;i++) {
		result += BernoulliSingleRun(n,i,p);
	}
	return result;
}


function BernoulliSingleRun(n,r,p) {
  let zaehler = 1;
  let nenner  = 1;
  for(let i=1;i<=r;i++) {nenner*=i}
  for(let i=(n-r)+1;i<=n;i++) {zaehler*=i}
  const Coeff = zaehler/nenner;
  return Coeff*Math.pow(p,r)*Math.pow(1-p,n-r);
}
