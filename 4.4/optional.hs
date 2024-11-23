data Optional a b = M b | N

-- Used simply to print result of 
unwrap :: Optional a Float -> String
unwrap x =
 case x of
    M val -> show val
    N -> "None" 

ident :: a -> Optional a a
ident = M

squareRoot :: Float -> Optional a Float
squareRoot x =
  if x >= 0
    then M (Prelude.sqrt x)
    else N

reciprocal :: Float -> Optional a Float
reciprocal x =
  if x == 0
    then N
    else M (1 / x)

(>=>) :: (a -> Optional a b) -> (b -> Optional b c) -> (a -> Optional a c)
m1 >=> m2 = \x ->
    case m1 x of
      M val -> case m2 val of
                    M val2 -> M val2
                    N -> N
      N -> N

sqrtRecip = squareRoot >=> reciprocal
recipSqrt = reciprocal >=> squareRoot

sqrtIdent = squareRoot >=> ident
identSqrt = ident >=> squareRoot

recipIdent = reciprocal >=> ident
identRecip = ident >=> reciprocal

-- Unwrap not associative: unwrap (squareRoot 4) not unwrap squareRoot 4
-- or unwrap $ squareRoot 4
