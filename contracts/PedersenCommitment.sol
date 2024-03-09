// SPDX-License-Identifier: MIT
pragma solidity 0.5.10;

/**
** Modified by Noella Spitz 2024. Original liscence:
** 
** MIT License
** 
** Copyright (c) 2019 Harsh Patel
** 
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
** 
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
** 
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

import "../libs/EllipticCurve.sol";
import "./EllipticCurveParameters.sol";
import "./SafeMath.sol";

contract PedersenCommitment is EllipticCurveParameters {
    using SafeMath for uint256;

    uint256 public H;

    modifier isHSet( ){
        require( H == 0);
        _;
    }

    function setH ( )
        internal
        isHSet
    {
        uint256 TH = uint256( keccak256(abi.encodePacked(now,msg.sender)));
        uint256 _p = pp;
        assembly{
            TH := mod(TH,_p)
        }
        H = TH;
    }

    function addmodP( uint256 _v1 , uint256 _v2 )
        internal
        view
        returns( uint256 _v3 )
    {
        uint256 _p = pp;
        assembly{
            _v3 := addmod(_v1,_v2,_p)
        }
    }

    function submodP( uint256 _v1 , uint256 _v2 )
        internal
        view
        returns( uint256 _v3 )
    {
        uint256 _p = pp;
        assembly{
            if lt( _v1 , _v2 ){
                _v3 := sub( _p , sub( _v2 , _v1 ) )
            }
            if gt(_v1 , _v2) {
                _v3 := mod( sub( _v1 , _v2 ) , _p )
            }
        }
    }

    function commit( uint256 _r , uint256 _v )
        public
        view
        returns ( uint256 _x3 , uint256 _y3 )
    {
        ( uint256 _lx , uint256 _ly ) = eMul( H , gx , gy );
        ( uint256 _x1 , uint256  _y1 ) = eMul( _r , gx , gy );
        ( uint256 _x2 , uint256 _y2 ) = eMul( _v , _lx , _ly );
        ( _x3 , _y3 ) = eAdd( _x1 , _y1 , _x2 , _y2 );
    }

    function verify( uint256 _r , uint256 _v , uint256 _x1 , uint256 _y1 )
        public
        view
        returns ( bool result )
    {
        ( uint256 _x2 , uint256 _y2 ) = commit( _r , _v );
        if ( (_x1 == _x2) && ( _y1 == _y2 ) ){
            result = true;
        }
    }

    function addCommitment( uint256 _r1 ,uint256 _x1 , uint256 _y1 ,  uint256 _r2 , uint256 _x2 , uint256 _y2 )
        public
        view
        returns ( uint256 _r3 , uint256 _x3 , uint256 _y3 )
    {
        _r3 = addmodP(_r1,_r2);
        ( _x3 , _y3 ) = eAdd( _x1 , _y1 , _x2 , _y2 );
    }

    function subCommitment( uint256 _r1 ,uint256 _x1 , uint256 _y1 ,  uint256 _r2 , uint256 _x2 , uint256 _y2 )
        public
        view
        returns ( uint256 _r3 , uint256 _x3 , uint256 _y3 )
    {
        _r3 = submodP( _r1 , _r2 );
        ( _x3 , _y3 ) = eSub( _x1 , _y1 , _x2 , _y2 );
    }

}