data Optional a b = M b | N

return :: a -> Optional a a
return = M

sqrt x =
  if x >= 0
    then M (Prelude.sqrt x)
    else N

recip x =
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

