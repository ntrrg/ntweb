// Fact returns the factorial of n.
func Fact(n int) int {
	r := 1

	for ; n > 1; n-- {
		r *= n
	}

	return r
}
