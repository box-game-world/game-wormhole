
import { Vertex, Vector } from './interfaces'
import PhysicalBody from './physical-body'
import { World, Events } from 'matter-js'
import { Container } from 'pixi.js';

export default class User extends PhysicalBody{

  private _vector:Vector;
  private _arrow:VectorArrow;

  constructor( world:World ){
    super( world );
  }

  protected _initialzed():void{
    this._body.label = 'User';
    this._arrow = new VectorArrow();
    this.sprite.addChild( this._arrow );

    // this._body.on( 'sleepStart' , ()=>{
    //   this._body.isStatic = true;
    // })
  }

  protected _generatorVertices():Vertex[]{
    const width:number = 10;
    const height:number = 10;
    return [
      { x:0, y:0 },
      { x:width, y:0 },
      { x:width, y:height }, 
      { x:0, y:height },
    ];
  }

  protected _update():void{
    super._update();
  }

  public setVector( vector:Vector ):void{
    this._vector = vector;
    this._arrow.setVector( vector );
  }
}

class VectorArrow extends PIXI.Container{

  private _vector:Vector;
  private _lineContainer:Container;
  private _headContainer:Container;
  private _lineGraphics:PIXI.Graphics;
  private _headGraphics:PIXI.Graphics;
  private _defaultLineWidth:number = 20;

  constructor(){
    super();
    this._lineContainer = new PIXI.Container();
    this._headContainer = new PIXI.Container();
    this._lineGraphics = new PIXI.Graphics();
    this._headGraphics = new PIXI.Graphics();
    this.addChild( this._lineContainer );
    this.addChild( this._headContainer );
    this._lineContainer.addChild( this._lineGraphics );
    this._headContainer.addChild( this._headGraphics );

    this._lineGraphics.lineStyle( 1, 0xffcccc, 1 );
    this._lineGraphics.moveTo( 0, 0 );
    this._lineGraphics.lineTo( 1, 0 );

    this._headGraphics.lineStyle( 1, 0xffcccc, 1 );
    this._headGraphics.moveTo( -5, -5 );
    this._headGraphics.lineTo( 0, 0 );
    this._headGraphics.lineTo( -5, 5 );

    this._setLineWidth( 0 );
  } 

  public setVector( vector:Vector ):void{
    this._vector = vector; 
    this.rotation = vector.radian;
    this._setLineWidth( vector.length );
  }

  private _setLineWidth( value:number ):void{
    this._lineContainer.width = this._defaultLineWidth + value;
    this._headContainer.x = this._lineContainer.width;
  }
}